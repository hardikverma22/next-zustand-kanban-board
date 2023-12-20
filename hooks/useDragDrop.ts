import {useStore} from "@/lib/store";
import {TaskType} from "../lib/types";

const useDragDrop = () => {
  const columns = useStore((state) => state.columns);
  const tasks = useStore((state) => state.tasks);
  const reorderTasks = useStore((state) => state.reorderTasks);

  const getList = (droppableId: string) => {
    return tasks.filter((task) => task.status === droppableId);
  };

  const move = (
    source: TaskType[],
    destination: TaskType[],
    droppableSourceIndex: number,
    droppableDestinationIndex: number,
    sourceDroppableId: string,
    destinationDroppableId: string
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSourceIndex, 1);

    destClone.splice(droppableDestinationIndex, 0, removed);

    const result: {[key: string]: TaskType[]} = {};
    result[sourceDroppableId] = sourceClone;
    result[destinationDroppableId] = destClone;

    return result;
  };

  const reorder = (list: TaskType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    const {source, destination} = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(getList(source.droppableId), source.index, destination.index);
      const allTasks = tasks.filter((task) => task.status !== source.droppableId);
      reorderTasks([...allTasks, ...items]);
      return;
    }

    const list = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source.index,
      destination.index,
      source.droppableId,
      destination.droppableId
    );

    const allNonrelatedItems = tasks.filter(
      (task) => task.status !== source.droppableId && task.status !== destination.droppableId
    );

    const newSourceList = list[source.droppableId].map((t) => {
      t.status = source.droppableId;
      return t;
    });
    const newDestList = list[destination.droppableId].map((t) => {
      t.status = destination.droppableId;
      return t;
    });
    const newTaskList = [...allNonrelatedItems, ...newSourceList, ...newDestList];
    reorderTasks(newTaskList);
  };
  return {columns, onDragEnd};
};

export default useDragDrop;

"use client";
import Task from "./Task";
import {useStore} from "@/lib/store";
import {useEffect} from "react";
import {cn} from "../lib/utils";
import {Droppable, Draggable} from "react-beautiful-dnd";

type ColumnProps = {
  columnTitle: string;
  status: any;
  max: number;
};

const Column = ({columnTitle, status, max}: ColumnProps) => {
  const tasks = useStore((state) => state.tasks);
  const filteredTasks = tasks && tasks.length > 0 ? tasks.filter((task) => task.status === status) : [];

  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  const hasMaxReached = filteredTasks.length > max;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    ...draggableStyle,
    userSelect: "none",
    background: isDragging ? "lightgreen" : "grey",
    marginTop: isDragging ? "45px" : "0px",
  });

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={cn(
            "flex flex-col gap-2 flex-1 min-h-[470px] bg-gradient-to-br from-gray-800 to-gray-700 rounded-md"
          )}
        >
          <div className="px-3 py-1 bg-gray-300/10">
            <h2 className="text-lg tracking-wider text-gray-300 font-normal flex gap-2 justify-between">
              <span>{columnTitle}</span>
              <span className={`${hasMaxReached && "text-red-400"}`}>
                ({filteredTasks.length}/{max})
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-2 p-2">
            {filteredTasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <Task {...item} key={item.id} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;

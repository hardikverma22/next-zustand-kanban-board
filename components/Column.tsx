"use client";
import Task from "./Task";
import {useStore} from "@/lib/store";
import {useEffect, useState} from "react";
import {cn} from "../lib/utils";

type ColumnProps = {
  columnTitle: string;
  status: any;
  max: number;
};

const Column = ({columnTitle, status, max}: ColumnProps) => {
  const tasks = useStore((state) => state.tasks);
  const dragTask = useStore((state) => state.dragTask);

  const updateTaskStatus = useStore((state) => state.updateTaskStatus);

  const filteredTasks = tasks.filter((task) => task.status === status);
  const draggedTask = useStore((state) => state.draggedTask);

  const [isDraggedOverCurrentColumn, setIsDraggedOverCurrentColumn] = useState(false);

  const handleDrop = () => {
    if (!draggedTask) return;
    updateTaskStatus(draggedTask, status);
    dragTask(null);
    setIsDraggedOverCurrentColumn(false);
  };

  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggedOverCurrentColumn(true);
  };

  const hasMaxReached = filteredTasks.length > max;

  return (
    <div className={cn("flex flex-col gap-2 flex-1 min-h-[470px] max-h-max")}>
      <h2 className="text-xl text-gray-300 font-bold flex gap-2">
        <span>{columnTitle}</span>
        <span className={`${hasMaxReached && "text-red-400"}`}>
          ({filteredTasks.length}/{max})
        </span>
      </h2>
      <div
        className={cn(
          `bg-gradient-to-br from-gray-800 to-gray-700 
                      rounded-lg flex flex-col gap-2 p-4
                      h-full`,
          {"border-2 border-dotted": isDraggedOverCurrentColumn},
          {
            "bg-gradient-to-br from-red-400 to-red-700 ": hasMaxReached,
          }
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDraggedOverCurrentColumn(false)}
      >
        {filteredTasks.map((task) => (
          <Task {...task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default Column;

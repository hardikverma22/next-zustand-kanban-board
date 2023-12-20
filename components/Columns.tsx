"use client";
import Column from "@/components/Column";
import {DragDropContext} from "react-beautiful-dnd";
import useDragDrop from "../hooks/useDragDrop";

const Columns = () => {
  const {columns, onDragEnd} = useDragDrop();

  return (
    <div className="w-full h-max">
      <section className="flex gap-6 h-max">
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((col) => (
            <Column columnTitle={col.name} status={col.id} key={col.id} max={col.max} />
          ))}
        </DragDropContext>
      </section>
    </div>
  );
};

export default Columns;

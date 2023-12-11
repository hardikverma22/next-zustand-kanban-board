"use client";
import Column from "@/components/Column";
import {useStore} from "@/lib/store";

const Columns = () => {
  const columns = useStore((state) => state.columns);

  return (
    <div className="w-full h-max">
      <section className="flex gap-6 h-max">
        {columns.map((col) => (
          <Column columnTitle={col.name} status={col.id} key={col.id} max={col.max} />
        ))}
        {/* <Column columnTitle="To-Do" status="TODO" />
        <Column columnTitle="In-Progress" status="IN_PROGRESS" />
        <Column columnTitle="Done" status="DONE" /> */}
      </section>
    </div>
  );
};

export default Columns;

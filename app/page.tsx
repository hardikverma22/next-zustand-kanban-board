import Columns from "@/components/Columns";
import Settings from "../components/Settings";
import NewTaskDailog from "../components/NewTaskDialog";
export default function Home() {
  return (
    <main className="flex flex-col gap-10 justify-center items-center min-h-screen max-h-max p-10">
      <div className="flex justify-between w-full">
        <NewTaskDailog />
        <Settings />
      </div>
      <Columns />
    </main>
  );
}

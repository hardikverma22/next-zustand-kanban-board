import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";

const NewTaskForm = ({ handleSubmit }: { handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Input id="title" name="title" defaultValue="A Brand New Task" className="col-span-4" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Textarea id="description" name="description" defaultValue="Sample Description" placeholder="Description..." className="col-span-4" />
      </div>
    </form>
  );
};

export default NewTaskForm;

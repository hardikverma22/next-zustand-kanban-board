"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { useStore } from "../lib/store";
import { Textarea } from "./ui/textarea";
import CustomDialog from "./CustomDialog";
import NewTaskForm from "./NewTaskForm";

const NewTaskDailog = () => {
  const addTask = useStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== "string" || typeof description !== "string") return;

    addTask(title, description);
  };

  return (
    <CustomDialog
      targetComponent={
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add a new Task
        </Button>
      }
      dialogTitle="Add a Task"
      dialogDescription="What do you want to get done today?"
      formName="todo-form"
      submitBtnText="Create Task"
      key="create-todo-dialog"
    >
      <NewTaskForm handleSubmit={handleSubmit} />
    </CustomDialog>
  );
};

export default NewTaskDailog;

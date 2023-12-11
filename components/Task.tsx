"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useStore} from "../lib/store";
import {Textarea} from "./ui/textarea";
import {cn} from "../lib/utils";
import {useState} from "react";
import CustomDialog from "./CustomDialog";

// import {Button} from "@/components/ui/button";
// import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Task = ({id, title, description, status}: {id: string; title: string; description?: string; status: string}) => {
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(description);

  const removeTask = useStore((state) => state.removeTask);
  const dragTask = useStore((state) => state.dragTask);
  const updateTask = useStore((state) => state.updateTask);

  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const {title, description} = Object.fromEntries(formData);

    if (typeof title !== "string" || typeof description !== "string") return;

    updateTask(id, title, description);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={cn(
            "cursor-grab min-h-[80px] flex justify-between items-start p-2 bg-white text-black rounded-lg",
            {
              "border-2 border-sky-500": status === "TODO",
              "border-2 border-amber-500": status === "IN_PROGRESS",
              "border-2 border-emerald-500": status === "DONE",
              "opacity-75 shadow-md border-dotted border-4": isDragging,
            }
          )}
          draggable
          onDragStart={() => {
            dragTask(id);
            setIsDragging(true);
          }}
          onDragEnd={() => setIsDragging(false)}
        >
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-xs max-w-[107px] h-[60px] break-words">{title}</span>
          </div>
          <button className="cursor-pointer" onClick={() => removeTask(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-gray-500 hover:text-rose-400"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Udpate Task</SheetTitle>
          <SheetDescription>Make changes to your task here. Click save when you're done.</SheetDescription>
        </SheetHeader>
        <form id="update-task-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea
              id="description"
              name="description"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Description..."
              className="col-span-4"
            />
          </div>
        </form>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" form="update-task-form">
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Task;

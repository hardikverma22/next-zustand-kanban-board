"use client";
import {Cross1Icon, GearIcon, PlusIcon} from "@radix-ui/react-icons";
import {Button} from "./ui/button";
import {useStore} from "../lib/store";
import {Input} from "./ui/input";
import {useEffect, useState} from "react";
import {ColumnType} from "../lib/types";
import {v4 as uuidv4} from "uuid";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const Settings = () => {
  const storeColumns = useStore((state) => state.columns);
  const udpateColumns = useStore((state) => state.udpateColumns);

  const [columns, setColumns] = useState(storeColumns);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setColumns(storeColumns);
  }, []);

  const updateError = () => {
    if (columns.length >= 6) setError("You can create maximun 7 columns");
    else setError(null);
  };

  const handleDeleteColumn = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newColumns = columns.filter((col) => col.id != id);
    setColumns(newColumns);
    updateError();
  };
  const handleAddNewColumn = () => {
    const newColumns: ColumnType[] = [...columns, {id: uuidv4(), name: "New Column"}];
    setColumns(newColumns);
    updateError();
  };

  const handleSave = () => {
    udpateColumns(columns);
  };

  const handleNameChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const newColumns = columns.map((col) => {
      if (col.id === id) col.name = e.target.value;
      return col;
    });

    setColumns(newColumns);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GearIcon
          onClick={() => setColumns(storeColumns)}
          className="h-6 w-6 text-white cursor-pointer hover:scale-110 duration-300"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Udpate Settings</DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-between">
          <span className="underline underline-offset-2">Column Settings</span>
          <Button size="sm" className="h-8 w-12" variant="outline" onClick={handleAddNewColumn}>
            <PlusIcon />
          </Button>
        </div>

        {columns.map((column) => (
          <div className="flex justify-between items-center gap-4" key={column.id}>
            <Input
              id={column.id}
              onChange={(e) => handleNameChange(column.id, e)}
              name={column.name}
              defaultValue={column.name}
              className="col-span-4"
            />
            <Button
              onClick={(e) => handleDeleteColumn(column.id, e)}
              variant="outline"
              className="hover:bg-red-500 hover:text-white hover:font-bold"
            >
              <Cross1Icon />
            </Button>
          </div>
        ))}

        <DialogFooter>
          <DialogTrigger>
            <Button
              type="button"
              onClick={handleSave}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Save
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;

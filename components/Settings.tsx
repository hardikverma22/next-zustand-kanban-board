"use client";
import {useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {Cross1Icon, GearIcon, PlusIcon} from "@radix-ui/react-icons";
import {useStore} from "../lib/store";
import {ColumnType} from "../lib/types";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const MAX_COL_COUNT = 5;

const Settings = () => {
  const storeColumns = useStore((state) => state.columns);
  const udpateColumns = useStore((state) => state.udpateColumns);

  const [columns, setColumns] = useState<ColumnType[]>([]);

  useEffect(() => {
    setColumns(storeColumns);
  }, []);

  const handleDeleteColumn = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newColumns = columns.filter((col) => col.id != id);
    setColumns(newColumns);
  };
  const handleAddNewColumn = () => {
    const newColumns: ColumnType[] = [...columns, {id: uuidv4(), name: "New Column", max: 4}];
    setColumns(newColumns);
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

  const handleMaxCountChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value) && Number(e.target.value) < 0) return;
    const newColumns = columns.map((col) => {
      if (col.id === id) col.max = Number(e.target.value);
      return col;
    });

    setColumns(newColumns);
  };

  const hasMaxCountReached: boolean = columns.length === MAX_COL_COUNT;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GearIcon
          onClick={() => setColumns(storeColumns)}
          className="h-6 w-6 text-white cursor-pointer hover:scale-110 duration-300"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Udpate Settings</DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-end">
          <Button size="sm" disabled={hasMaxCountReached} variant="default" onClick={handleAddNewColumn}>
            <PlusIcon /> Add Column
          </Button>
        </div>

        {columns.map((column) => (
          <div className="flex justify-between items-center gap-4" key={column.id}>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between w-full">
                <span className="w-[80%]">Column Name</span>
                <span className="w-[20%] text-center">Max</span>
              </div>
              <div className="flex gap-2">
                <Input
                  id={column.id}
                  onChange={(e) => handleNameChange(column.id, e)}
                  name={column.name}
                  defaultValue={column.name}
                  className="col-span-4"
                />
                <Input
                  onChange={(e) => handleMaxCountChange(column.id, e)}
                  name={column.max.toString()}
                  defaultValue={column.max}
                  type="number"
                  className="w-[20%]"
                  min={1}
                />
              </div>
            </div>
            <div className="flex justify-end items-end h-full">
              <Button
                onClick={(e) => handleDeleteColumn(column.id, e)}
                variant="outline"
                className="hover:bg-red-500 hover:text-white hover:font-bold"
              >
                <Cross1Icon />
              </Button>
            </div>
          </div>
        ))}

        <DialogFooter>
          <DialogTrigger>
            <Button
              type="button"
              onClick={handleSave}
              className="disabled:cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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

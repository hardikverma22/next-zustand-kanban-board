import {create} from "zustand";
import {ColumnType, TaskType} from "./types";
import {v4 as uuidv4} from "uuid";
import {persist} from "zustand/middleware";
import {Columns} from "./constant";

type State = {
  tasks: TaskType[];
  columns: ColumnType[];
};

type Actions = {
  addTask: (title: string, description: string) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, title: string, description: string) => void;
  udpateColumns: (columns: ColumnType[]) => void;
  reorderTasks: (tasks: TaskType[]) => void;
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      columns: Columns,
      addTask: (title, description) =>
        set((state) => ({tasks: [{id: uuidv4(), title, description, status: "TODO"}, ...state.tasks]})),
      removeTask: (id: string) => set((state) => ({tasks: state.tasks.filter((task) => task.id != id)})),
      updateTask: (id, title, description) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id === id) {
              task.title = title;
              task.description = description;
            }
            return task;
          }),
        })),
      udpateColumns: (columns: ColumnType[]) => set({columns}),
      reorderTasks: (tasks: TaskType[]) => set({tasks}),
    }),
    {name: "task-store", skipHydration: true}
  )
);

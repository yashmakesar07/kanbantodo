import { createSlice } from "@reduxjs/toolkit";
import { users } from "./utils";


const initialState = {
  columns: {
    TODO: [],
    InProgress: [],
    Completed: [],
    Deleted: [],
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnName, task } = action.payload;
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const newTask = { ...task, userId: randomUser.id };
      console.log(newTask);
      state.columns[columnName].push(newTask);
    },
    
    moveTask: (state, action) => {
      const { from, to, task } = action.payload;

      const taskIndex = state.columns[from].findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        const [removedTask] = state.columns[from].splice(taskIndex, 1);

        if (to === "Deleted") {
          removedTask.deletedAt = Date.now();
        }
        console.log(removedTask);
        state.columns[to].push(removedTask);
      }
    },
    removeTask: (state, action) => {
      const { taskId } = action.payload;
      console.log(taskId);

      state.columns["Deleted"] = state.columns["Deleted"].filter(
        (task) => task.id !== taskId
      );
      console.log("remove taks", state.columns["Deleted"]);
    },
  },
});

export const { addTask, moveTask, removeTask } = todoSlice.actions;

export default todoSlice.reducer;

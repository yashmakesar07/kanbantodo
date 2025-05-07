import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  columns: {
    "TO-DO": [
      { id: nanoid(), title: "Task 1" },
      { id: nanoid(), title: "Task 2" }
    ],
    "In Progress": [
      { id: nanoid(), title: "Task 3" },
      { id: nanoid(), title: "Task 4" }
    ],
    "Completed": [
        { id: nanoid(), title: "Task 6" }
    ],
    "Deleted": [
        { id: nanoid(), title: "Task 5" },
    ],
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnName, task } = action.payload;
      state.columns[columnName].push(task);
    },
    moveTask: (state, action) => {
      const { from, to, taskId } = action.payload;

      const taskIndex = state.columns[from].findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        const [task] = state.columns[from].splice(taskIndex, 1);
        state.columns[to].push(task);
      }
    },
    //future work
  },
});

export const { addTask, moveTask } = todoSlice.actions;

export default todoSlice.reducer;

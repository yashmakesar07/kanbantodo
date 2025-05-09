import { createSlice } from "@reduxjs/toolkit";


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
      try {
        const { columnName, task } = action.payload;
        const randomUser = {
          id: "unAssigned",
          name: "UnAssigned",
        }
        const newTask = { ...task, assignedTo: randomUser };
        console.log(newTask);
        state.columns[columnName].push(newTask);
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    
    moveTask: (state, action) => {
      try {
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
      } catch (error) {
        console.error('Error moving task:', error);
      }
    },

    removeTask: (state, action) => {
      try {
        const { taskId } = action.payload;
        console.log(taskId);
        state.columns["Deleted"] = state.columns["Deleted"].filter(
          (task) => task.id !== taskId
        );
        console.log("remove taks", state.columns["Deleted"]);
      } catch (error) {
        console.error('Error removing task:', error);
      }
    },

    asssigntaskTo: (state, action) => {
      try {
        const { taskId, currentColumn, user } = action.payload;
        const task = state.columns[currentColumn].find((task) => task.id === taskId);
        if (task) {
          task.assignedTo = user;
          console.log("task assignes ", task.assignedTo);
        }
      } catch (error) {
        console.error('Error assigning task:', error);
      }
    }
  },
});

export const { addTask, moveTask, removeTask, asssigntaskTo } = todoSlice.actions;

export default todoSlice.reducer;

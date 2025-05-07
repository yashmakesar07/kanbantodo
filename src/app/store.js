import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlicers"
export const store = configureStore({
    reducer: {
    todo: todoReducer,
    },
})
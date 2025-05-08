import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlicers"
import { loadState, saveState } from "./utils";

 
console.log(loadState());
export const store = configureStore({
    reducer: {
    todo: todoReducer,
    },
    preloadedState: loadState(),
})

store.subscribe(()=>{
    saveState(store.getState())
})
import { configureStore } from "@reduxjs/toolkit";
import workspaceReducer from "./slices/workspaceSlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    workspaces: workspaceReducer,
    tasks: taskReducer,
  },
});
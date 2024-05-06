import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "../../features/filters";

export const store = configureStore({
  reducer: {
    filters: FilterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

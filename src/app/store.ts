import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/wrap/layoutSlice";
import scheduleReducer from "../features/ScheduleSlice";
import tasksReducer from "../features/TasksSlice";

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        schedule: scheduleReducer,
        tasks: tasksReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
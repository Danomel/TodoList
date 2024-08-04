import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/wrap/layoutSlice";
import scheduleReducer from "../features/ScheduleSlice";

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        schedule: scheduleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
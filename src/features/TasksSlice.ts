import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
export type TasksState = typeof initialState;

const initialState = {
    tasks: [
        {
            id: uuidv4(),
            time: "",
            text: "text"
        },
        {
            id: uuidv4(),
            time: "",
            text: "lorem"
        },
    ]
}   

export const tasksSlice = createSlice({
    name: "Tasks",
    initialState,
    reducers: {
        handleTaskCompleted: (state, action: PayloadAction<{id: string}>) => {
            const taskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
            state.tasks.splice(taskIndex, 1)
           
            
        }
    }
})

export const {handleTaskCompleted} = tasksSlice.actions

export default tasksSlice.reducer;
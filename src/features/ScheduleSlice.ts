import { createSlice } from "@reduxjs/toolkit";

export type scheduleState = typeof initialState
export type Content = {
  text: string;
  startTime: string;
  endTime: string;
};
export type AddContentPayload = {
  index: number;
  values: Content;
};
export const initialState = {
  week: [
    {
      day: "Понедельник",
      content: [
        {
          text: "asdasd",
          startTime: "14:88",
          endTime: "13:37",
        },
        {
          text: "asdasd",
          startTime: "14:88",
          endTime: "13:37",
        },
      ],
    },
    {
      day: "Вторник",
      content: [],
    },
    {
      day: "Среда",
      content: [],
    },
    {
      day: "Четверг",
      content: [],
    },
    {
      day: "Пятница",
      content: [],
    },
    {
      day: "Суббота",
      content: [],
    },
    {
      day: "Воскресенье",
      content: [],
    },
  ],
  isContentModalOpen: false
};

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
      addContent: (state, action: {payload: AddContentPayload}) => {
        const {index, values} = action.payload;
        if(index >= 0 && index < state.week.length) {
          state.week[index].content.push(values)
        }
      },
      deleteContent: (state, action) => {
        const {index, contentIndex} = action.payload;
        
        if(index >= 0 && index < state.week.length) {
          if(contentIndex >= 0 && contentIndex < state.week[index].content.length){
            state.week[index].content.splice(contentIndex, 1);
            console.log(state.week[index])
          }
        }
      },
      setIsContentModalOpen: (state, action) => {
        state.isContentModalOpen = action.payload
      }
    }
});

export const { addContent, setIsContentModalOpen, deleteContent } = scheduleSlice.actions;
export default scheduleSlice.reducer;

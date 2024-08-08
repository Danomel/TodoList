import { createSlice } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

export type scheduleState = typeof initialState
export type Content = {
  text: string;
  startTime: string;
  endTime: string;
};
export type AddContentPayload = {
  index: number | null;
  values: Content;
  contentIndex?: null | number
};
export const initialState = {
  week: [
    {
      day: "Понедельник",
      content: [
        {
          text: "первый",
          startTime: "14:11",
          endTime: "13:37",
        },
        {
          text: "второй",
          startTime: "14:12",
          endTime: "13:37",
        },
        {
          text: "третии",
          startTime: "14:13",
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
    {
      day: "Павел",
      content: [],
    },
    {
      day: "Вера",
      content: [],
    },
  ],
  isContentAddModalOpen: false,
};

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
      addContent: (state, action: {payload: AddContentPayload}) => {
        const {index, values, contentIndex = null} = action.payload;
        if(index !== null && index >= 0 && index < state.week.length) {
          if(contentIndex !== null && contentIndex >= 0 && contentIndex < state.week[index].content.length){
            state.week[index].content[contentIndex] = values
          }
          else {
            state.week[index].content.push(values)
          }
        }
      },
      deleteContent: (state, action) => {
        const {index, contentIndex} = action.payload;
        if(index >= 0 && index < state.week.length) {
          if(contentIndex >= 0 && contentIndex < state.week[index].content.length){
            state.week[index].content.splice(contentIndex, 1);
          }
        }
      },
      setIsContentAddModalOpen: (state, action) => {
        state.isContentAddModalOpen = action.payload
      },
    }
});

export const { addContent, setIsContentAddModalOpen, deleteContent } = scheduleSlice.actions;
export default scheduleSlice.reducer;

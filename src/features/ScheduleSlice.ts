import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export type scheduleState = typeof initialState
export type Content = {
  id: string;
  text: string;
  startTime: string;
  endTime: string;
};
export type AddContentPayload = {
  day?: string
  values: Omit<Content, "id">;
  contentId?: null | string
};
export interface TargetType {
  day: string;
  contentId: string | null;
}
const week = [
  {
    day: "Понедельник",
    content: [
      {
        id: uuidv4(),
        text: "первый",
        startTime: "14:11",
        endTime: "13:37",
      },
      {
        id: uuidv4(),
        text: "второй",
        startTime: "14:12",
        endTime: "13:37",
      },
      {
        id: uuidv4(),
        text: "третии",
        startTime: "14:13",
        endTime: "13:37",
      },
      
    ],
  },
  {
    day: "Вторник",
    content: [{
      id: uuidv4(),
      text: "первый",
      startTime: "14:11",
      endTime: "13:37",
    },],
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
];
const accordionCount = week.length
const expandedPanels = Array(accordionCount).fill(false) as boolean[]
const initialState = {
  week,
  isContentAddModalOpen: false,
  accordionCount,
  expandedPanels,
  isEditMode: false,
  selectedTarget: null as null | TargetType,
  editModeIndex: null as null | number,
  selectedItems: [] as Content[],
  selectedCopyDay: [{
    day: "Воскресенье",
    content: [],
  },] as typeof week
};

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
      addContent: (state, action: {payload: AddContentPayload}) => {
        const {day, values, contentId} = action.payload;
        const dayIndex = state.week.findIndex((item) => item.day === day);
        if(dayIndex >= 0){
        if(contentId){
          const contentIndex = state.week[dayIndex].content.findIndex((item) => 
            item.id === contentId)
          if(contentIndex >= 0){
            state.week[dayIndex].content[contentIndex] = 
            {...state.week[dayIndex].content[contentIndex], ...values}
          }
        } else {
          state.week[dayIndex].content.push({id: uuidv4(), ...values})
        }
      }
      },
      deleteContent: (state, action: {payload: Omit<AddContentPayload, "values">}) => {
        const {day, contentId } = action.payload;
        const dayIndex = state.week.findIndex((item) => item.day === day);
        if(dayIndex >= 0){
        if(contentId){
          const contentIndex = state.week[dayIndex].content.findIndex((item) => 
            item.id === contentId)
          if(contentIndex >= 0){
            state.week[dayIndex].content.splice(contentIndex, 1)
          }
        }
      }  
      },
      setIsContentAddModalOpen: (state, action) => {
        state.isContentAddModalOpen = action.payload
      },
      setSelectedTarget: (state, action) => {
        state.selectedTarget = action.payload
      },
      handleToggleIsContentAddModal: (state, action: {payload: TargetType | undefined}) => {
        if(action.payload !== undefined){
          const target = action.payload;
          if (target?.day && target?.contentId) {
            state.selectedTarget = action.payload
          }
          if (target?.day) {
            state.selectedTarget = action.payload
          }
        }        
        state.isContentAddModalOpen = !state.isContentAddModalOpen
      },
      handleExpandedClick: (state, action: {payload: {index: number, expand?: boolean}}) => {
        const {index, expand} = action.payload
        const newExpandedPanels = [...state.expandedPanels]
        if (expand) {
          newExpandedPanels[index] = expand;
        } else {
          newExpandedPanels[index] = !newExpandedPanels[index];
        }
        state.expandedPanels = newExpandedPanels
      },
      setIsEditMode: (state, action: {payload: {IsEdit: boolean, index: number}}) => {
        const {IsEdit, index} = action.payload;
        state.isEditMode = IsEdit;
        state.editModeIndex = index;
        state.expandedPanels = state.expandedPanels.fill(false);
        state.expandedPanels[index] = true
      },
      handleSelectAll: (state, action : {payload: {content: Content[]}}) => {
        const {content} = action.payload
        const allSelected =
          content.length > 0 &&
          content.every((item) => state.selectedItems.some((selectedItem) => selectedItem.id === item.id));
        if (allSelected) {
          state.selectedItems = []
          console.log(state.selectedItems)
        } else {
          state.selectedItems = content
          console.log(state.selectedItems)
        }
      },
      handleToggleSelectItem: (state, action: {payload: {content: Content}}) => {
        const {content} = action.payload;
        if (state.selectedItems.some((item) => item.id === content.id)) {
          state.selectedItems = state.selectedItems.filter((item) => item.id !== content.id)
        } else {
          state.selectedItems = [...state.selectedItems, content]
        }
      },
      handleSelectedCopyDay: (state, action: {payload: {index: number}}) => {
        const {index} = action.payload;
        const selected = state.selectedCopyDay.some((item) => item.day === week[index].day);
        const dayIndex = state.selectedCopyDay.findIndex((item) => item.day === week[index].day)
        console.log(state.selectedCopyDay[0])
        if(selected){
          state.selectedCopyDay.splice(dayIndex, 1)
        }
        else {
          state.selectedCopyDay.push(week[index])
        }
      },
      handleSelectedCopyDayDelete: (state) => {
        state.selectedCopyDay = [];
        state.isEditMode = false
      },
      handleSelectedCopyDayAccept: (state) => {
        state.selectedCopyDay.forEach((selectedDay => {
          const weekDay = state.week.findIndex((day) => day.day === selectedDay.day)
          if(weekDay !== -1) {
            const newContent = state.selectedItems.map((item) => ({...item, id: uuidv4()}))
            state.week[weekDay].content = [...state.week[weekDay].content, ...newContent];
          }
        })
      )
        state.selectedCopyDay = [];
        state.isEditMode = false
      }
}});

export const { addContent, setIsContentAddModalOpen, deleteContent, handleToggleIsContentAddModal, 
  handleExpandedClick, setIsEditMode, handleSelectAll, handleToggleSelectItem, handleSelectedCopyDay, handleSelectedCopyDayDelete, 
  handleSelectedCopyDayAccept } = scheduleSlice.actions;
export default scheduleSlice.reducer;

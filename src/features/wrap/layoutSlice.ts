import { createSlice } from "@reduxjs/toolkit"

export interface layoutState {
    sidebarWidth: number,
    isSideBarOpen: boolean,
    isSideBarClosing: boolean,
}

const initialState: layoutState = {
    isSideBarClosing: false,
    isSideBarOpen: false,
    sidebarWidth: 300
}

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        handleToggleSideBar: (state) => {
            if(!state.isSideBarClosing){
                state.isSideBarOpen = !state.isSideBarOpen
            }
        },
        handleSideBarClose: (state) => {
            state.isSideBarClosing = true;
            state.isSideBarOpen = false
        },
        handleSideBarTransitionEnd: (state) => {
            state.isSideBarOpen = true
        }
    }
})

export const {handleToggleSideBar, handleSideBarClose, 
    handleSideBarTransitionEnd} = layoutSlice.actions;
    
export default layoutSlice.reducer;
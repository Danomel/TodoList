import { createSlice } from "@reduxjs/toolkit"

export interface layoutState {
    sideBarWidth: number,
    appBarHeight: {xs: number, sm: number}
    isSideBarOpen: boolean,
    isSideBarClosing: boolean,
}

const initialState: layoutState = {
    isSideBarClosing: false,
    isSideBarOpen: false,
    sideBarWidth: 300,
    appBarHeight: {xs: 56, sm: 64}
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
            state.isSideBarClosing = false;
        }
    }
})

export const {handleToggleSideBar, handleSideBarClose, 
    handleSideBarTransitionEnd} = layoutSlice.actions;
    
export default layoutSlice.reducer;
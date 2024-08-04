import { Drawer } from "@mui/material";
import { SideBarContent } from "./SidebarContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  handleSideBarClose,
  handleSideBarTransitionEnd,
} from "../../features/wrap/layoutSlice";

export function SideBar() {
  const isSideBarOpen = useSelector(
    (state: RootState) => state.layout.isSideBarOpen
  );
  const sideBarWidth = useSelector(
    (state: RootState) => state.layout.sideBarWidth
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <Drawer
        variant="temporary"
        open={isSideBarOpen}
        onTransitionEnd={() => dispatch(handleSideBarTransitionEnd())}
        onClose={() => dispatch(handleSideBarClose())}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sideBarWidth,
          },
        }}
      >
        <SideBarContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sideBarWidth,
          },
        }}
        open
      >
        <SideBarContent />
      </Drawer>
    </>
  );
}

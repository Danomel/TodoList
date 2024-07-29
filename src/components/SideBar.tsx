import { Drawer } from "@mui/material";
import { SideBarContent } from "./SidebarContent";

interface SideBarProps {
  sideBarWidth: number;
  isSideBarOpen: boolean;
  handleSideBarClose: () => void;
  handleSideBarTransitionEnd: () => void;
}

export function SideBar(props: SideBarProps) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={props.isSideBarOpen}
        onTransitionEnd={props.handleSideBarTransitionEnd}
        onClose={props.handleSideBarClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.sideBarWidth,
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
            width: props.sideBarWidth,
          },
        }}
        open
      >
        <SideBarContent />
      </Drawer>
    </>
  );
}

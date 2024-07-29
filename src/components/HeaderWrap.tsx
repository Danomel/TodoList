import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { SideBar } from "./SideBar";
export function HeaderWrap() {
  const sideBarWidth = 300;
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSideBarClosing, setIsSideBarClosing] = useState(false);
  function handleToggleSideBar() {
    if (!isSideBarClosing) {
      setIsSideBarOpen(!isSideBarOpen);
    }
  }
  function handleSideBarClose() {
    setIsSideBarClosing(true);
    setIsSideBarOpen(false);
  }
  function handleSideBarTransitionEnd() {
    setIsSideBarClosing(false);
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sideBarWidth}px)` },
          ml: { sm: `${sideBarWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            // size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleToggleSideBar}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: sideBarWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <SideBar
          sideBarWidth={sideBarWidth}
          isSideBarOpen={isSideBarOpen}
          handleSideBarClose={handleSideBarClose}
          handleSideBarTransitionEnd={handleSideBarTransitionEnd}
        />
      </Box>
    </Box>
  );
}

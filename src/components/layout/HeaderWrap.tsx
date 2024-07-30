import { AppBar, Box, CssBaseline, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { handleToggleSideBar } from "../../features/wrap/layoutSlice";
export function HeaderWrap() {
  const dispatch: AppDispatch = useDispatch();
  const sideBarWidth = useSelector(
    (state: RootState) => state.layout.sidebarWidth
  );
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
            onClick={() => dispatch(handleToggleSideBar())}
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
      ></Box>
    </Box>
  );
}

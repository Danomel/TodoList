import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { handleToggleSideBar } from "../../features/wrap/layoutSlice";
export function HeaderWrap() {
  const { appBarHeight, sideBarWidth } = useSelector(
    (state: RootState) => state.layout
  );
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${sideBarWidth}px)` },
          height: { sm: `${appBarHeight.sm}px`, xs: `${appBarHeight.xs}px` },
          ml: { sm: `${sideBarWidth}px` },
          bgcolor: "#ADD8E6",
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
            <MenuIcon sx={{ color: "#696969" }} />
          </IconButton>
        </Toolbar>
        <Divider />
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

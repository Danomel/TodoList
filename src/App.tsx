import { Box, CssBaseline } from "@mui/material";
import { HeaderWrap } from "./components/layout/HeaderWrap";
import { BrowserRouter } from "react-router-dom";
import { SideBar } from "./components/layout/SideBar";

function App() {
  // todo: В HeaderWrap унести оттуда sideBar сюда, создать новую компоненту в Routes
  // сюда, и настроить верстку через grid. Унести сюда все зависимости между sideBar и HeaderWrap
  // создать конст, с высотой header, унести сюда ширину sidebar
  return (
    <BrowserRouter>
      <Box>
        <CssBaseline />
        <HeaderWrap />
        <SideBar />
      </Box>
    </BrowserRouter>
  );
}

export default App;

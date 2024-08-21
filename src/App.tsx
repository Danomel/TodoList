import { Box, CssBaseline } from "@mui/material";
import { HeaderWrap } from "./components/layout/HeaderWrap";
import { SideBar } from "./components/layout/SideBar";
import { Content } from "./components/content/Content";
import { BrowserRouter } from "react-router-dom";

function App() {
  // todo: В HeaderWrap унести оттуда sideBar сюда, создать новую компоненту в Routes
  // сюда, и настроить верстку через grid. Унести сюда все зависимости между sideBar и HeaderWrap
  // создать конст, с высотой header, унести сюда ширину sidebar
  // 01.08.24 работаю над popup....
  return (
    <BrowserRouter>
      <Box>
        <CssBaseline />
        <HeaderWrap />
        <SideBar />
        <Content />
      </Box>
    </BrowserRouter>
  );
}

export default App;

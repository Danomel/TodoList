import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ScheduleComponent } from "./Schedule/ScheduleComponent";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { TasksComponent } from "./Tasks/TasksComponent";

export function Content() {
  const appBarHeight = useSelector(
    (state: RootState) => state.layout.appBarHeight
  );
  const sideBarWidth = useSelector(
    (state: RootState) => state.layout.sideBarWidth
  );
  // todo: Сверстать макет расписанииииииииолурпщнрукпрывлгрыукгшчп
  return (
    <Box
      sx={{
        mt: {
          xs: `${appBarHeight.xs}px`,
          sm: `${appBarHeight.sm}px`,
        },
        ml: {
          sm: `${sideBarWidth + 60}px`,
        },
        mr: "60px",
        p: 2,
        flexGrow: 1,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/schedule" element={<ScheduleComponent />}></Route>
          <Route path="/tasks" element={<TasksComponent />}></Route>
        </Routes>
      </Suspense>
    </Box>
  );
}

import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ScheduleComponent } from "./Schedule/ScheduleComponent";

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
      <ScheduleComponent />
    </Box>
  );
}

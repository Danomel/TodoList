import { Box, Divider } from "@mui/material";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { ScheduleAddContentModal } from "./ScheduleAddContentModal";
import { ScheduleCopyContentModal } from "./ScheduleCopyContentModal";
import { SheduleAccordion } from "./SheduleAccordion";

export interface TargetType {
  day: string;
  contentId: string | null;
}
export const ScheduleComponent = memo(() => {
  const { week, selectedTarget } = useSelector(
    (state: RootState) => state.schedule
  );
  return (
    <Box sx={{ bgcolor: "white", padding: "0px 4px 0px 0px", borderRadius: 0 }}>
      <ScheduleAddContentModal target={selectedTarget} />
      <ScheduleCopyContentModal />
      {week.map((schedule, index) => (
        <div key={index}>
          <SheduleAccordion schedule={schedule} index={index} />
          <Divider />
        </div>
      ))}
    </Box>
  );
});

import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { ScheduleAccordionDetails } from "./ScheduleAccordionDetails";
import { ScheduleAddContentModal } from "./ScheduleAddContentModal";
import {
  Content,
  setIsContentAddModalOpen,
} from "../../../features/ScheduleSlice";
import { Dayjs } from "dayjs";

export const ScheduleComponent = memo(() => {
  const isContentAddModalOpen = useSelector(
    (state: RootState) => state.schedule.isContentAddModalOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  const [selectedContentIndex, setSelectedContentIndex] = useState<
    null | number
  >(null);
  function handleToggleIsContentAddModal(
    index: number | null,
    contentIndex?: number
  ) {
    setSelectedIndex(index);

    contentIndex !== null && setSelectedContentIndex(contentIndex!);

    dispatch(setIsContentAddModalOpen(!isContentAddModalOpen));
  }
  const week = useSelector((state: RootState) => state.schedule.week);
  return (
    <Box sx={{ bgcolor: "white", padding: "0px 4px 0px 0px", borderRadius: 0 }}>
      <ScheduleAddContentModal
        handleToggleIsContentAddModal={handleToggleIsContentAddModal}
        selectedIndex={selectedIndex}
        selectedContentIndex={selectedContentIndex}
      />

      {week.map((schedule, index) => (
        <div key={index}>
          <Accordion
            sx={{ mt: "10px", border: "#cfcfcf solid 1px" }}
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{schedule.day}</Typography>
            </AccordionSummary>
            {schedule.content.map((content, contentIndex) => (
              <ScheduleAccordionDetails
                key={contentIndex}
                content={content}
                contentIndex={contentIndex}
                index={index}
                handleToggleIsContentAddModal={handleToggleIsContentAddModal}
              />
            ))}
            <Button
              onClick={() => handleToggleIsContentAddModal(index)}
              sx={{ width: "100%" }}
            >
              Добавить задачу
            </Button>
          </Accordion>
          <Divider />
        </div>
      ))}
    </Box>
  );
});

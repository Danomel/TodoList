import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ScheduleAddForm } from "./ScheduleAddForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setIsContentModalOpen } from "../../../features/ScheduleSlice";
import { ScheduleAccordionDetails } from "./ScheduleAccordionDetails";
export function ScheduleComponent() {
  // const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const isContentModalOpen = useSelector(
    (state: RootState) => state.schedule.isContentModalOpen
  );
  const dispatch: AppDispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
  function handleToggleIsContentModalContent(index: number | null) {
    setSelectedIndex(index);
    dispatch(setIsContentModalOpen(!isContentModalOpen));
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const week = useSelector((state: RootState) => state.schedule.week);
  return (
    <Box sx={{ bgcolor: "white", padding: "0px 4px 0px 0px", borderRadius: 0 }}>
      {week.map((schedule, index) => (
        <div key={index}>
          <Accordion sx={{ mt: "10px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{schedule.day}</Typography>
            </AccordionSummary>
            {schedule.content.map((content, contentIndex) => (
              <ScheduleAccordionDetails
                content={content}
                contentIndex={contentIndex}
                index={index}
              />
            ))}
            <Button
              onClick={() => handleToggleIsContentModalContent(index)}
              sx={{ width: "100%" }}
            >
              Добавить задачу
            </Button>
            <Modal
              open={isContentModalOpen}
              onClose={() => handleToggleIsContentModalContent(null)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              slotProps={{
                backdrop: {
                  sx: {
                    backgroundColor: "rgba(0, 0, 0, 0.2)", // черный цвет с 50% прозрачности
                  },
                },
              }}
            >
              <Box sx={style}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h6">Добавить задачу</Typography>
                </Box>
                <Box sx={{ mt: "30px" }}>
                  <ScheduleAddForm index={selectedIndex!} />
                </Box>
              </Box>
            </Modal>
          </Accordion>
          <Divider />
        </div>
      ))}
    </Box>
  );
}

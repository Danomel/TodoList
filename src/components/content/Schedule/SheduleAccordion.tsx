import { Accordion, Button } from "@mui/material";
import { ScheduleAccordionSummary } from "./ScheduleAccordionSummary";
import { ScheduleAccordionDetails } from "./ScheduleAccordionDetails";
import {
  Content,
  handleToggleIsContentAddModal,
} from "../../../features/ScheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

export type SheduleType = {
  day: string;
  content: Content[];
};
type SheduleAccordionProps = {
  schedule: SheduleType;
  index: number;
};

export const SheduleAccordion = ({
  schedule,
  index,
}: SheduleAccordionProps) => {
  const { expandedPanels, isEditMode, editModeIndex, selectedItems } =
    useSelector((state: RootState) => state.schedule);
  const dispatch = useDispatch();
  return (
    <Accordion
      expanded={expandedPanels[index]}
      sx={{ mt: "10px", border: "#cfcfcf solid 1px" }}
      elevation={0}
    >
      <ScheduleAccordionSummary
        schedule={schedule}
        index={index}
        isEditMode={isEditMode}
        editModeIndex={editModeIndex}
        selectedItems={selectedItems}
      />
      {schedule.content.map((content) => (
        <ScheduleAccordionDetails
          isEditMode={isEditMode}
          key={content.id}
          content={content}
          day={schedule.day}
          selectedItems={selectedItems}
        />
      ))}
      <Button
        onClick={() =>
          dispatch(
            handleToggleIsContentAddModal({
              day: schedule.day,
              contentId: null,
            })
          )
        }
        sx={{ width: "100%" }}
      >
        Добавить задачу
      </Button>
    </Accordion>
  );
};

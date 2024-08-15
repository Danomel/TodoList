import {
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Typography,
} from "@mui/material";
import {
  Content,
  handleExpandedClick,
  handleSelectAll,
  handleSelectedCopyDay,
  handleSelectedCopyDayAccept,
  handleSelectedCopyDayDelete,
  setIsEditMode,
} from "../../../features/ScheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { SheduleType } from "./SheduleAccordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RootState } from "../../../app/store";

interface Props {
  index: number;
  schedule: SheduleType;
  isEditMode: boolean;
  editModeIndex: null | number;
  selectedItems: Content[];
}
export const ScheduleAccordionSummary = ({
  index,
  schedule,
  isEditMode,
  editModeIndex,
  selectedItems,
}: Props) => {
  const dispatch = useDispatch();
  const selectedDayItem = { ...schedule };
  const { selectedCopyDay } = useSelector((state: RootState) => state.schedule);
  const handleAccordionClick = () => {
    if (isEditMode === true) {
      if (editModeIndex === index) {
        dispatch(handleExpandedClick({ index }));
      }
    } else {
      dispatch(handleExpandedClick({ index }));
    }
  };
  const handleCheckboxClick = () => {
    if (editModeIndex === index) {
      dispatch(handleSelectAll({ content: selectedDayItem.content }));
    }
  };
  const handleEditCancel = () => {
    dispatch(handleSelectedCopyDayDelete());
  };
  const renderSummaryContent = () => {
    if (isEditMode && editModeIndex === index) {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 1, mr: 1 }}>
            <Button onClick={handleEditCancel} size="small">
              Сбросить
            </Button>
            <Button
              onClick={() => dispatch(handleSelectedCopyDayAccept())}
              size="small"
            >
              Принять
            </Button>
          </Box>
          <Box flexShrink={1}>
            <Checkbox
              checked={
                selectedDayItem.content.length > 0 &&
                selectedDayItem.content.every((items) =>
                  selectedItems.includes(items)
                )
              }
              indeterminate={
                selectedItems.length > 0 &&
                selectedItems.length < selectedDayItem.content.length
              }
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
              }}
              onChange={handleCheckboxClick}
            />
          </Box>
        </Box>
      );
    } else if (isEditMode && editModeIndex !== index) {
      return (
        <Box>
          <Checkbox
            checked={selectedCopyDay.some(
              (item) => item.day === selectedDayItem.day
            )}
            onChange={() => dispatch(handleSelectedCopyDay({ index }))}
          ></Checkbox>
        </Box>
      );
    } else {
      return (
        <Box flexShrink={1}>
          <Button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.stopPropagation();
              dispatch(handleExpandedClick({ index, expand: true }));
              dispatch(setIsEditMode({ IsEdit: true, index }));
            }}
            sx={{
              color: "#757575",
              width: "55px",
              minWidth: "auto",
            }}
          >
            <ContentCopyIcon />
          </Button>
        </Box>
      );
    }
  };
  return (
    <AccordionSummary
      onClick={handleAccordionClick}
      expandIcon={<ExpandMoreIcon />}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>{schedule.day}</Typography>
        </Box>
        {renderSummaryContent()}
      </Box>
    </AccordionSummary>
  );
};

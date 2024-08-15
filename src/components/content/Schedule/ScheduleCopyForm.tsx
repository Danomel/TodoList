import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Content } from "../../../features/ScheduleSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type Props = {
  weekDay: number;
};
export const ScheduleCopyForm = ({ weekDay }: Props) => {
  const week = useSelector((state: RootState) => state.schedule.week);
  // const selectedDay = ;
  // selectedDay.content.push({
  //   startTime: "14:11",
  //   endTime: "13:37",
  // });

  const [selectedItems, setSelectedItems] = useState<Content[]>([]);
  const selectedDayItem = week[weekDay];
  const handleSelectAll = (content: Content[]) => {
    const allSelected =
      content.length > 0 &&
      content.every((item) => selectedItems.includes(item));
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(content);
    }
  };

  const handleToggleSelectItem = (content: Content) => {
    if (selectedItems.some((item) => item === content)) {
      setSelectedItems(selectedItems.filter((item) => item !== content));
    } else {
      setSelectedItems([...selectedItems, content]);
    }
    console.log(selectedItems);
  };
  return (
    <Box>
      <Accordion sx={{ maxHeight: "" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Понедельник
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: `150px`, // Вы можете настроить отступы по необходимости
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Box>
            <FormControlLabel
              sx={{ width: "100%" }}
              label={selectedDayItem.day}
              control={
                <Checkbox
                  checked={
                    selectedDayItem.content.length > 0 &&
                    selectedDayItem.content.every((item) =>
                      selectedItems.includes(item)
                    )
                  }
                  indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < selectedDayItem.content.length
                  }
                  onChange={() => handleSelectAll(selectedDayItem.content)}
                />
              }
            />
            {selectedDayItem.content.map((selectedContent) => (
              <Box sx={{ pt: 1 }}>
                <FormControlLabel
                  sx={{ width: "100%" }}
                  label={
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          width: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Typography sx={{}}>
                          {selectedContent.startTime} -{" "}
                          {selectedContent.endTime}
                        </Typography>
                      </Box>
                      <Divider flexItem orientation="vertical" />
                      <Box sx={{ wordBreak: "break-word" }}>
                        <Typography sx={{}}>
                          basdssssssssbasdssssssssbasdssssssssbasdssssssssssbasdsssssssssssssssbasdsssssssssssssssbasdssssssss
                          sssssbasdssssssssbasdssssssssbasdssssssssbas
                          dssssssssbasdssssssssbasdssssssssbasdsssssss
                          sbasdssssssssbasdssssssssbasdssssssssbasdssss
                          ssssbasdssssssssbasdssssssssbasdssssssssbasds
                        </Typography>
                      </Box>
                    </Box>
                  }
                  control={
                    <Checkbox
                      checked={selectedItems.some(
                        (item) => selectedContent === item
                      )}
                      onChange={() => handleToggleSelectItem(selectedContent)}
                    />
                  }
                />
                <Box>
                  <Divider sx={{ pt: 1 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ height: "350px" }}>qwe</Box>
      <Box sx={{ width: "100%", mt: "15px" }}>
        <Button
          variant="outlined"
          color="success"
          size="large"
          sx={{ width: "100%" }}
        >
          Принять
        </Button>
      </Box>
    </Box>
  );
};

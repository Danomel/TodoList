import {
  AccordionDetails,
  Box,
  Checkbox,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Content,
  deleteContent,
  handleToggleIsContentAddModal,
  handleToggleSelectItem,
} from "../../../features/ScheduleSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";

interface ScheduleAccordionDetailsProps {
  day: string;
  content: Content;
  isEditMode: boolean;
  selectedItems: Content[];
}

export function ScheduleAccordionDetails({
  day,
  content,
  isEditMode,
  selectedItems,
}: ScheduleAccordionDetailsProps) {
  const dispatch: AppDispatch = useDispatch();
  return (
    <AccordionDetails sx={{ pb: 0 }}>
      <Box key={content.id} sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "100px",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ whiteSpace: "nowrap" }}>
            {content.startTime} - {content.endTime}
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ p: 1 }} />
        <Box
          sx={{
            padding: "10px 16px 10px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              wordBreak: "break-word",
              marginRight: "16px",
            }}
          >
            {content.text}
          </Box>
          {isEditMode ? (
            <Box sx={{ mr: 1 }}>
              <Checkbox
                checked={selectedItems.some((item) => content.id === item.id)}
                onChange={() => dispatch(handleToggleSelectItem({ content }))}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                }}
              />
            </Box>
          ) : (
            <Box sx={{ flexShrink: 1, display: "flex" }}>
              <Box>
                <IconButton
                  onClick={() =>
                    dispatch(
                      handleToggleIsContentAddModal({
                        day,
                        contentId: content.id,
                      })
                    )
                  }
                  sx={{
                    color: "#757575",
                    ":hover": {
                      color: "orange",
                    },
                  }}
                  size="small"
                >
                  <ModeEditIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  onClick={() =>
                    dispatch(deleteContent({ day, contentId: content.id }))
                  }
                  sx={{
                    color: "#757575",
                    ":hover": {
                      color: "red",
                    },
                  }}
                  size="small"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
    </AccordionDetails>
  );
}

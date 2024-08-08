import { Box, Modal, Typography } from "@mui/material";
import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { ScheduleAddForm } from "./ScheduleAddForm";
import { FC, memo } from "react";

export interface ScheduleAddContentModalProps {
  handleToggleIsContentAddModal: (index: number | null) => void;
  selectedIndex: number | null;
  selectedContentIndex: number | null;
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

export const ScheduleAddContentModal: FC<ScheduleAddContentModalProps> = memo(
  ({ handleToggleIsContentAddModal, selectedIndex, selectedContentIndex }) => {
    const isContentAddModalOpen = useSelector(
      (state: RootState) => state.schedule.isContentAddModalOpen
    );

    return (
      <Modal
        open={isContentAddModalOpen}
        onClose={() => handleToggleIsContentAddModal(null)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)", // черный цвет с 80% прозрачности
            },
          },
        }}
      >
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6">Добавить задачу</Typography>
          </Box>
          <Box sx={{ mt: "30px" }}>
            <ScheduleAddForm
              index={selectedIndex}
              selectedContentIndex={selectedContentIndex}
            />
          </Box>
        </Box>
      </Modal>
    );
  }
);

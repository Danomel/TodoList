import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ScheduleCopyForm } from "./ScheduleCopyForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "70%",
};
export const ScheduleCopyContentModal = () => {
  const [isContentCopyModalOpen, setIsContentCopyModalOpen] = useState(false);
  return (
    <Modal
      open={isContentCopyModalOpen}
      onClose={() => setIsContentCopyModalOpen(false)}
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
          <Typography variant="h6">Копировать</Typography>
        </Box>
        <Box sx={{ mt: "25px" }}>
          <ScheduleCopyForm weekDay={0} />
        </Box>
      </Box>
    </Modal>
  );
};

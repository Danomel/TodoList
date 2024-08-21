import { Box, Checkbox, Divider, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { handleTaskCompleted } from "../../../features/TasksSlice";
export const TasksComponent = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch: AppDispatch = useDispatch();
  function handleComplete(id: string) {
    setTimeout(() => {
      dispatch(handleTaskCompleted({ id }));
    }, 400);
  }
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ p: 0.7 }}>
          <Typography variant="h6">Сегодня</Typography>
        </Box>
        {tasks.map((task) => (
          <div key={task.id}>
            <Box
              sx={{
                pb: 1,
                pl: 0,
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Box>
                <Checkbox
                  icon={<PanoramaFishEyeIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  sx={{ p: 0.7 }}
                  onChange={() => handleComplete(task.id)}
                />
              </Box>
              <Box>
                <Typography>{task.text}</Typography>
              </Box>
            </Box>
            <Divider />
          </div>
        ))}
      </Box>
    </Box>
  );
};

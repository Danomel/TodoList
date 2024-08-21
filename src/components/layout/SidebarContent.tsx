import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
export function SideBarContent() {
  const SpecialListItemButton = styled(ListItemButton)({
    backgroundColor: "lightblue", // Здесь задаём особенный цвет
  });
  const sideBarData1 = [
    { name: "Добавить задачу", url: "/" },
    { name: "Задачи", url: "/tasks" },
    { name: "Сегодня", url: "/" },
    { name: "Расписание", url: "/schedule" },
    { name: "Планы", url: "/" },
  ];
  const sideBarData2 = ["Mail", "Корзина", "Спам"];
  const navigate = useNavigate();
  return (
    <div>
      <Toolbar disableGutters>
        <Button size="medium" sx={{ px: "12px" }}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
              justifyContent: "left",
            }}
          >
            <Avatar>MB</Avatar>
            <Typography>Name</Typography>
          </Box>
        </Button>
      </Toolbar>
      <Divider />
      <List>
        {sideBarData1.map((text, index) => (
          <ListItem key={index} disablePadding>
            {text.name === "Добавить задачу" ||
            text.name === "Добавить цель" ? (
              <SpecialListItemButton onClick={() => navigate(text.url)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </SpecialListItemButton>
            ) : (
              <ListItemButton onClick={() => navigate(text.url)}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sideBarData2.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

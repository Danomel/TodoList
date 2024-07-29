import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
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
import logo from "../assets/logo.png";
export function SideBarContent() {
  const SpecialListItemButton = styled(ListItemButton)({
    backgroundColor: "lightblue", // Здесь задаём особенный цвет
  });
  const sideBarData1 = [
    "Добавить задачу",
    "Сегодня",
    "Расписание",
    "Блокнот",
    "Добавить цель",
    "Цели",
  ];
  const sideBarData2 = ["Mail", "Корзина", "Спам"];

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
            {text === "Добавить задачу" || text === "Добавить цель" ? (
              <SpecialListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </SpecialListItemButton>
            ) : (
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
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

"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  ThemeProvider,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Paper,
  Stack,
  Divider,
  Popover,
  Container,
  Grid,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  position: "relative",
  paddingRight: "36px",
}));

const fooddetail = [
  {
    id: 1,
    name: "ข้าวมันไก่",
    details: "ไก่จากพม่า",
    price: 45.0,
  },
  {
    id: 2,
    name: "ข้าวหัวหมู",
    details: "หมูจากดูไบ",
    price: 55.0,
  },
  {
    id: 3,
    name: "ข้าวผัดกระเพรา",
    details: "ซอสจากตะวันออก",
    price: 40.0,
  },
  {
    id: 4,
    name: "ข้าวผัดพริก",
    details: "พริกจากแคนนาดา",
    price: 50.0,
  },
  {
    id: 5,
    name: "ข้าวผัด",
    details: "ซอสจากสวิซ",
    price: 40.0,
  },
  {
    id: 6,
    name: "ข้าวหน้าเป็ด",
    details: "เป็ดจากฮอกไกโด",
    price: 50.0,
  },
];

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "4px" /* ปรับระยะห่างขอบขวาของปุ่ม */,
}));

export default function Cart() {
  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{ backgroundColor: "brown", width: "100%", height: "40px" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            <IconButton
              onClick={() => (window.location.href = "/Menu")}
              color="inherit"
              aria-label="previous page"
              sx={{ mt: -3.5 }}
            >
              <ArrowBackIcon />
              {/* ปุ่มย้อนกลับ*/}
            </IconButton>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0, mt: -2.5 }}
          >
            <h3>โต๊ะที่ 199</h3>
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack spacing={2}>
        {fooddetail.map((food) => (
          <Item>
            {food.name}
            {food.price}
            <DeleteButton color="inherit" aria-label="delete">
              <ClearIcon />
            </DeleteButton>
          </Item>
        ))}
      </Stack>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            backgroundColor: "#ba000d",
            "&:hover": {
              backgroundColor: "#ff7961",
            },
          }}
        >
          send order
        </Button>
      </Grid>
    </>
  );
}

"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Paper,
  Stack,
  Grid,
  Container,
  Modal,
  Box,
} from "@mui/material";

import Tabmenu from "./components/Tabmenu";
import BTnavigation from "./components/BTnavigation";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  {
    id: 7,
    name: "ข้าวหน้าปลาทอด",
    details: "ปลาจากแม่กลอง",
    price: 60.0,
  },
];

const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "4px" /* ปรับระยะห่างขอบขวาของปุ่ม */,
}));

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

export default function Cart() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [openModal1, setOpenModal1] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);

  const handleOpenModal1 = () => setOpenModal1(true);
  const handleCloseModal1 = () => setOpenModal1(false);
  const handleOpenModal2 = () => setOpenModal2(true);
  const handleCloseModal2 = () => setOpenModal2(false);

  // ในส่วนของเพิ่มลดจำนวนอาหาร
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={2} sx={{ mt: 10, mb: 1 }}>
          {fooddetail.map((food) => (
            <Item key={food.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ fontSize: "18px" }}>{food.name}</div>
                <div style={{ fontSize: "18px" }}>{food.price}</div>
                <div style={{ marginLeft: "auto" }}>
                  {/* ปุ่มเข้าหน้าเพิ่มและลดจำนวนเมนู */}
                  <Button onClick={handleOpen}>
                    <CreateIcon sx={{ color: "black" }} />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                      "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.2)", // พื้นหลังตอนกด modal
                      },
                    }}
                  >
                    <Box sx={style}>
                      {/* ปุ่มเพิ่มและลดจำนวนเมนู */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">Quantity: {count}</Typography>
                        <IconButton
                          onClick={handleDecrement}
                          aria-label="decrement"
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleIncrement}
                          aria-label="increment"
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </Box>
                  </Modal>

                  {/* ปุ่มลบเมนู */}
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            </Item>
          ))}
        </Stack>
      </Container>

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
            mt: 0,
            backgroundColor: "#ba000d",
            "&:hover": {
              backgroundColor: "#ff7961",
            },
          }}
        >
          send order
        </Button>
      </Grid>
      <Tabmenu />
      <BTnavigation />

      {/* <Stack direction="row" spacing={2} alignItems="center">

    </Stack> */}
    </div>
  );
}

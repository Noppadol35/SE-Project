import React, { useState } from "react";
import { Paper, Button, IconButton, Box, Modal } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  position: "relative",
  paddingRight: "36px",
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

import { Cart } from "@/types/entity";

interface CartItemsProps {
  cartData: Cart[];
  handleOpen: () => void;
  handleDecrement: () => void;
  handleIncrement: () => void;
  deleteCart: (id: string) => void;
}

const CartItems: React.FC<CartItemsProps> = ({
  cartData,
  handleOpen,
  handleDecrement,
  handleIncrement,
  deleteCart,
}) => {
  const [modalCart, setModalCart] = useState(false);

  return (
    <div>
      {cartData.map((foodDetail) => (
        <Item key={foodDetail.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "18px" }}>{foodDetail.menu.name}</div>
            <div style={{ fontSize: "18px" }}>{foodDetail.quantity}</div>
            <div style={{ marginLeft: "auto" }}>
              <Button onClick={() => setModalCart(true)}>
                <CreateIcon sx={{ color: "black" }} />
              </Button>
              <Modal
                open={modalCart}
                onClose={() => setModalCart(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                  "& .MuiBackdrop-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={style}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "18px" }}>
                      {foodDetail.quantity}
                    </div>
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
              <IconButton aria-label="delete" size="small" onClick={() => deleteCart(foodDetail.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </Item>
      ))}
    </div>
  );
};

export default CartItems;

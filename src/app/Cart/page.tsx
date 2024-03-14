'use client';
import React, { useEffect, useState } from "react";
import { Container, Stack, Grid } from "@mui/material";
import axios from "axios";
import CartItems from "./components/CartItem";
import Tabmenu from "./components/Tabmenu";
import BTnavigation from "./components/BTnavigation";
import { Cart  } from "@/types/entity";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [count, setCount] = useState(0);
  const [cartData, setCartData] = useState<Cart[]>([]);
  const [deletedCart, setDeletedCart] = useState<Cart[]>([]);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    try {
      const response = await axios.get("http://localhost:3000/api/Cart");
      setCartData(response.data as Cart[]);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  // async function updateCart() {
  //   try {
  //     await axios.put("http://localhost:3000/api/Cart");
  //     console.log("Cart updated successfully");
  //   } catch (error) {
  //     console.error("Error updating cart:", error);
  //   }
  // }

  async function deleteCart(id: string) {
    try {
      await axios.delete(`http://localhost:3000/api/Cart/${id}`);
      console.log("Cart deleted successfully");
      // หลังจากลบสำเร็จ คุณอาจต้องเรียกใช้ getCart() เพื่ออัปเดตข้อมูล cart ที่แสดงใหม่
      getCart();
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  }  
  

  return (
    <div>
      <Container maxWidth="sm">
        <Stack spacing={2} sx={{ mt: 16, mb: 1 }}>
          <CartItems
            cartData={cartData} // Pass cartData as a prop to CartItems
            handleOpen={handleOpen}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            deleteCart={deleteCart}
          />
        </Stack>
      </Container>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <button
          type="button"
          onClick={handleOpen} // Open modal function
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900="
        >
          send order
        </button>
      </Grid>
      <Tabmenu />
      <BTnavigation />
    </div>
  );
}

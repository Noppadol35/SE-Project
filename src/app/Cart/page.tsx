'use client';
import React from "react";
import { Cart  } from "@/types/entity";
import NavbarCart from "./components/NavbarCart";
import TabCart from "./components/TabCart";
import CustomizedSnackbars from "./components/CustomizedSnackbars";


export default function Cart() {
  return (
    <div>
      <NavbarCart />
      <TabCart />
      <CustomizedSnackbars/>
    </div>
  );
}

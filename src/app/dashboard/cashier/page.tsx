<<<<<<< HEAD

=======
>>>>>>> 599b865 (Add new files and update imports)
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Home from "@/components/Dashboard/cashier/cashirePage"

export const metadata = {
  title: "Cashier 🧾",
};

export default function Cashier() {
  return (
    <div>
      <Home />
    </div>
  );
}
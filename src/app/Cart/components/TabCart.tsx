import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import QuantityControlCart from "./QuantityControlCart";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";


interface CartItem {
  id: string;
  menu: {
    name: string;
    price: number;
  };
  order: { 
    quantity: number;
  };
}

const StickyHeadTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100); // Set default rows per page
  const [order, setOrder] = useState<CartItem[]>([]);

  useEffect(() => {
    getOrder();
  }, []);

  async function getOrder() {
    try {
      const response = await axios.get("http://localhost:3000/api/Cart");
      setOrder(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }

  async function deleteOrder() {
    try {
      await axios.delete("http://localhost:3000/api/Cart");
      setOrder([]);
    } catch (error) {
      console.error("Error deleting cart data:", error);
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleIncrement = (index: number) => {
    setOrder(prevRows => {
      const newRows = [...prevRows];
      newRows[index].order.quantity = Math.max(0, newRows[index].order.quantity + 0.5);
      return newRows;
    });
  };

  const handleDecrement = (index: number) => {
    setOrder(prevRows => {
      const newRows = [...prevRows];
      newRows[index].order.quantity = Math.max(0, newRows[index].order.quantity - 0.5);
      return newRows;
    });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography variant="body1">{row.menu.name}</Typography>
                  </TableCell>
                  <TableCell>{row.menu.price} บาท</TableCell>
                  <TableCell>
                    <QuantityControlCart
                      count={row.order.quantity}
                      handleIncrement={() => handleIncrement(page * rowsPerPage + index)}
                      handleDecrement={() => handleDecrement(page * rowsPerPage + index)}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete" arrow>
                      <IconButton onClick={() => deleteOrder}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StickyHeadTable;

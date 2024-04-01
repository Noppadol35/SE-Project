"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  IconButton,
  TableFooter,
} from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';





const StickyHeadTable = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100); // Set default rows per page

  const [cart, setCart] = useState<any[]>([]);
  const [menu, setMenu] = useState([]);
  const [name, setname] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([])
  const [quantities, setQuantities] = useState([])
  const [search, setSearch] = useState('')
  const router = useRouter();
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [open, setOpen] = React.useState(false);
  
  



  const fetchPostsTable = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

      setname(res.data.name || "");
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMenu = async () => {
    try {
      const query = new URLSearchParams({search, category}).toString()
      const response = await axios.get(`http://localhost:3000/api/menu?${query}`)
      setMenu(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchCart = async () => {
    try {
      const response = await axios.get(`/api/Cart/${id}`);
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchPostsTable(id);
    fetchCart();
    fetchMenu();
    fetchCategories();
  }, [id]);

  useEffect(() => {
    const totalsMap: { [key: string]: number } = {};
    cart.forEach((item: any) => {
      if (item.status !== 'pending..') {
        const menuName = item.menu.name;
        totalsMap[menuName] = (totalsMap[menuName] || 0) + item.quantity;
      }
    });
    setTotals(totalsMap);
  }, [cart]);


  const deletePost = async (id: Number) => {
    try {
      await axios.delete(`/api/Cart/${id}`)
      
      fetchCart();
      fetchMenu();
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete the post', error)
    }
  }

  const handleDelete = async (key: any, ids: any) => {
    try {
      const [status, menuName] = key.split("-");
      const menuItem = cart.find(
        (item) => item.status === status && item.menu.name === menuName
      );
  
      if (menuItem) {
        if (menuItem.quantity === 1) {
          // ถ้าจำนวนเท่ากับ 1 ให้ลบรายการนั้นออกจากตะกร้า
          await deletePost(menuItem.id);
        } else {
          // ถ้าจำนวนมากกว่า 1 ให้ลดจำนวนลง 1
          await axios.put(`/api/Cart/${menuItem.id}`, {
            quantity: menuItem.quantity - 1,
          });
        }
      }
  
      fetchCart();
    } catch (error) {
      console.error("Failed to delete or update cart item", error);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleClick = async () => {
    try {
      // อัปเดตสถานะของรายการในตะกร้าเป็น "pending"
      await Promise.all(
        cart.map(async (itemincart: any) => {
          await axios.put(`/api/Cart/${itemincart.id}`, { status: 'pending..' });
        })
      );
  
      // สร้างข้อมูลคำสั่งใหม่จากรายการในตะกร้า
      const orderData = Object.entries(totals).flatMap(([menuName, total]) =>
        cart
          .filter(item => item.menu.name === menuName && item.status !== 'pending..')
          .map(item => ({
            menuID: item.menu.id,
            menu: item.menu.name,
            quantity: total,
            tableID: id,
            cartID: item.id,
          }))
      );
  
      // ส่งข้อมูลคำสั่งไปยัง API
      const response = await axios.post('/api/order', orderData);
  
      if (response.status === 201) {
        // ถ้าสร้างคำสั่งสำเร็จ
        setOpen(true);
  
        // รีเฟรชข้อมูลในตะกร้า
        fetchCart();
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order', error);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <><div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>

          <TableContainer component={Paper}>

            <Table stickyHeader aria-label="sticky table">


              <TableHead>
                <TableRow >
                      <TableCell align="center" colSpan={3}>YOUR ORDER</TableCell>        
                </TableRow>
                <TableRow>
                  <TableCell align="center">QUANTITY</TableCell>
                  <TableCell align="center">NAME</TableCell>
                  <TableCell align="center">DELETE</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(
                  cart.reduce((acc, curr) => {
                    const { status, menu, quantity, id } = curr;
                    const key = `${status}-${menu.name}`;
                    acc[key] = acc[key] || { status, menuName: menu.name, quantity: 0, ids: [] };
                    acc[key].quantity += quantity;
                    acc[key].ids.push(id);
                    return acc;
                  }, {})
                ).map(([key, { status, menuName, quantity, ids }]: any) => (
                  <TableRow key={key}>
                    <TableCell align="center">
                      <Typography variant="body1">{quantity}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{menuName}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        disabled={status === "pending.."}
                        sx={{
                          background: "#8c2b0a",
                          border: "1px solid #ADBC9F",
                          p: 1,
                          "&:hover": {
                            bgcolor: "#66220b",
                          },
                        }}
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(key, ids)}
                      >
                        {quantity > 1 ? "Decrease" : "Delete"}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{status}</Typography>
                    </TableCell>
                  </TableRow>
                ))} 
              </TableBody>
                
              <TableFooter>
                
                  <TableRow >
                      <TableCell align="center" colSpan={4}>DETAIL</TableCell>        
                  </TableRow>
                  <TableRow>
                      <TableCell align="center" colSpan={2}>NAME</TableCell>
                      <TableCell align="center" colSpan={2}>QTY.</TableCell>     
                  </TableRow>
                
                  
                    {Object.entries(totals).map(([menuName, total]) => (
                      <TableRow key={menuName}>
                        <TableCell align="center"  colSpan={2}>
                          <Typography variant="body1" >{menuName}</Typography>
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          <Typography variant="body1">{total}</Typography>
                        </TableCell>     
                      </TableRow>
                    ))}

                 <TableRow>
                  <TableCell align="center" colSpan={4}>
                        <Button sx={{
                          background: "#a7d180",
                          border: "1px solid #ADBC9F",
                          p: 3,
                          "&:hover": {
                            bgcolor: "#7e946a",
                        }}}
                          variant="contained"
                          onClick={handleClick} >

                          SEND ORDER</Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                            >
                            <Alert
                              onClose={handleClose}
                              severity="success"
                              variant="filled"
                              sx={{ width: '100%' }}
                            >
                                Your order is complete. Please wait to receive your food.
                        </Alert>
                      </Snackbar>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
           
 
    </>
  );
};

export default StickyHeadTable;

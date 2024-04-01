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
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const useStyles = makeStyles({
  tableContainer: {
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #dddddd',
    
  },
  tableHeadCell: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderBottom: '1px solid #dddddd',
  },
});


const StickyHeadTable = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  
  const [menu, setMenu] = useState([]);
  const classes = useStyles();
  const [quantity, setQuantity] = useState('');
  const [menuID, setMenuID] = useState("");
  const [tableID, setTableID] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([])
  const [quantities, setQuantities] = useState([])
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('name');
  const [name, setname] = useState("");
  
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
  
 
  const handleApplyFilters = () => {
    fetchMenu();
   
  }

  useEffect(() => {
    fetchPostsTable(id);
    fetchMenu()
    fetchCategories();
    
    
  }, [id]);

  const handleAddToCart = async (menuId: number) => {
    try {
      await axios.post('/api/Cart', {
        menuID: menuId,
        quantity: 1,
        tableID: id, // ใช้ id จาก params
      });
      // แสดงข้อความแจ้งเตือนหรือทำการอื่น ๆ หลังจากเพิ่มรายการเสร็จสิ้น
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  



  return (
    <div className={classes.tableContainer}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
        <div className="flex justify-between items-center mb-6">
                <div className="flex gap-111">
                  <input
                    type="text"
                    placeholder="Search by name.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Categories</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={handleApplyFilters}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none"
                  >
                    Apply
                  </button>
                 
                </div>
              </div>
          <TableContainer component={Paper}>

            <Table stickyHeader aria-label="sticky table">
              
           
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>NAME</TableCell>
                  <TableCell className={classes.tableHeadCell}>CATEGORY</TableCell>
                  <TableCell className={classes.tableHeadCell}>QUANTITY</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.map((menu: any) => (
                  <TableRow key={menu.id}>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body1">{menu.name}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Typography variant="body1">{menu.category.name}</Typography>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Box sx={{ minWidth: 120 }}>
                        
                          <Button
                            variant="contained"
                            color="primary" 
                            onClick={() => handleAddToCart(menu.id)}
                               
                          >
                            Add to Cart
                          </Button> 
                        
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default StickyHeadTable;

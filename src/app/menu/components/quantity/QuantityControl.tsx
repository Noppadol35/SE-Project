"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';




const QuantityControl: React.FC = () => {
  const [menu, setMenu] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(100); // Set default rows per page

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const router = useRouter();

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/menu");
      setMenu(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPostsTable = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

      setname(res.data.name || "");
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchMenu();
  }, []);

  
 
  return (
    <div>
      <TableContainer  component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
             
              <TableCell >Name</TableCell>
              
              <TableCell >Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu.map((menu: any) => (
                <TableRow key={menu.id}>
                  
                  <TableCell >
                    <Typography variant="body1">{menu.name}</Typography>
                  </TableCell>
                  
              
                  <TableCell >
                    <Tooltip title="Add to cart" arrow>
                      <IconButton>
                        <AddShoppingCartOutlinedIcon />
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


export default QuantityControl;

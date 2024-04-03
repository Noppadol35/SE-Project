// Import useState and useEffect from React
import React, { useState, useEffect } from "react";
import OrderHistoryPage from "./OrderHistoryPage";
import { Modal, Button } from "@mantine/core";
import axios from 'axios';
import Navbar from "@/components/Dashboard/Chef/components/Navbar";
import { Order } from "@/types/entity";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

import CssBaseline from '@mui/material/CssBaseline';

function groupByTableAndTime(orders: Order[]) {
  const groupedOrders: { [key: string]: Order[] } = {};

  orders.forEach((order) => {
    const { tableID, createdAt } = order;
    const key = `${tableID}_${new Date(createdAt).getHours()}_${new Date(createdAt).getMinutes()}`;

    if (!groupedOrders[key]) {
      groupedOrders[key] = [];
    }

    groupedOrders[key].push(order);
  });

  return groupedOrders;
}

export default function ChefOrderPage() {
  const [order, setOrders] = useState([]);
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantities, setQuantities] = useState([])
  const [menu, setMenu] = useState([]);
  const [table, setTable] = useState<any[]>([]);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts`)
      setTable(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/order");
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/menu");
      setMenu(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMenu();
    fetchPosts();
    fetchOrders();
  }, []);

  const handleViewOrderHistory = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const pendingOrders = (tableId: string) => {
    return order.filter((ord: any) => ord.tableID === tableId && ord.status === 'pending..');
  }

  const groupedOrders = groupByTableAndTime(order);

  const handleServeOrder = async (orderId: string) => {
    try {
      // Update order status to "served"
      await axios.put(`http://localhost:3000/api/order/${orderId}`, { status: 'served' });

      // Update cart status to "served"
      const cartId = (order.find((ord: any) => ord.id === orderId) as any)?.cartID;
      if (cartId) {
        await axios.put(`http://localhost:3000/api/cart/${cartId}`, { status: 'served' });
      }

      // Refetch orders
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center flex-col ">
        <div className="w-full md:w-25px p-9 md:h-[90dvh] rounded-xl flex flex-col justify-center items-center">
          <div className="flex items-center text-2xl p-3" >
            <p style={{ marginRight: "20rem" }}>Food Order - Bill</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 py-7 overflow-y-scroll w-full ">
            <Grid container spacing={1} gap={5} padding={2}>
              {Object.keys(groupedOrders).map((key) => (
                <React.Fragment key={key}>
                  {pendingOrders(groupedOrders[key][0].tableID).length > 0 && (
                    <Button
                      className="card-body gap-6 justify-end p-6"
                      variant="contained"
                      onClick={() => handleServeOrder(groupedOrders[key][0].id)}
                    >
                      <Typography variant="h6" fontSize={20} className="card-body gap-6 justify-end p-6">
                        {table.find(t => t.id === (groupedOrders[key][0].tableID || ''))?.name}
                      </Typography>
                      {groupedOrders[key].map((ord) => (
                        <Grid key={ord.id} item xs={4} sm={4} md={4} textAlign="center">
                          <Box
                            display="inline-flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Typography fontSize={16}>
                              {ord.quantity}x {ord.menu.name} - {new Date(ord.createdAt).toLocaleTimeString()}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Button>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
}

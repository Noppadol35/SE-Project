"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
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
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const StickyHeadTable = ({ params }: { params: { id: string } }) => {
    const router = useRouter();
    const { id } = params;

    const [menu, setMenu] = useState([]);
    const [quantity, setQuantity] = useState("");
    const [menuID, setMenuID] = useState("");
    const [cart, setCart] = useState([]);
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name");
    const [name, setName] = useState("");
    const [isInCartMap, setIsInCartMap] = useState<{
        [menuID: number]: boolean;
    }>({});

    const fetchPostsTable = async (id: string) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/posts/${id}`
            );
            setName(res.data.name || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMenu = useCallback(async () => {
        try {
            const query = new URLSearchParams({ search, category }).toString();
            const response = await axios.get(
                `http://localhost:3000/api/menu?${query}`
            );
            setMenu(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [search, category]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/categories`
            );
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCart = useCallback(async () => {
        try {
            const response = await axios.get(`/api/Cart?tableID=${id}`);
            const cartData = response.data;
            const isInCartMap = cartData.reduce(
                (acc: { [menuID: number]: boolean }, item: any) => {
                    if (item.status === "waiting to send..") {
                        acc[item.menuID] = true;
                    }
                    return acc;
                },
                {}
            );
            setIsInCartMap(isInCartMap);
            setCart(cartData);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    const handleApplyFilters = () => {
        fetchMenu();
    };

    useEffect(() => {
        fetchPostsTable(id);
        fetchMenu();
        fetchCategories();
        fetchCart();
    }, [id, fetchMenu, fetchCart]);

    const handleAddToCart = async (menuId: number) => {
        try {
            const response = await axios.get(`/api/Cart?tableID=${id}`);
            const cartData = response.data;

            const itemInCart = cartData.find(
                (item: any) =>
                    item.menuID === menuId &&
                    item.status === "waiting to send.."
            );

            if (itemInCart) {
                await axios.delete(`/api/Cart/${itemInCart.id}`);
                setIsInCartMap((prev) => ({ ...prev, [menuId]: false }));
            } else {
                await axios.post("/api/Cart", {
                    menuID: menuId,
                    quantity: 1,
                    tableID: id,
                    status: "waiting to send..",
                });
                setIsInCartMap((prev) => ({ ...prev, [menuId]: true }));
            }

            fetchCart();
        } catch (error) {
            console.error("Error adding/removing to/from cart:", error);
        }
    };

    return (
        <div>
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
                                    <TableCell>NAME</TableCell>
                                    <TableCell align="left">CATEGORY</TableCell>
                                    <TableCell align="center">
                                        QUANTITY
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menu.map((menu: any) => (
                                    <TableRow key={menu.id}>
                                        <TableCell>
                                            <Typography variant="body1">
                                                {menu.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="body1">
                                                {menu.category.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ minWidth: 120 }}>
                                                <Button
                                                    variant="contained"
                                                    className={
                                                        isInCartMap[menu.id]
                                                            ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                            : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                                    }
                                                    onClick={() =>
                                                        handleAddToCart(menu.id)
                                                    }
                                                >
                                                    {isInCartMap[menu.id]
                                                        ? "Remove from Cart"
                                                        : "Add to Cart"}
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

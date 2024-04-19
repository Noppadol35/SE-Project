"use client";

import React, { useEffect, useState } from "react";
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
<<<<<<< HEAD

    const [quantity, setQuantity] = useState("");
    const [menuID, setMenuID] = useState("");
    const [cart, setcartID] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name");
    const [name, setname] = useState("");
    const [isInCart, setIsInCart] = useState(false);
    const [isInCartMap, setIsInCartMap] = useState<{
        [menuID: number]: boolean;
    }>({});

    const fetchPostsTable = async (id: string) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/posts/${id}`
            );

            setname(res.data.name || "");
=======
    const [quantity, setQuantity] = useState("");
    const [menuID, setMenuID] = useState("");
    const [tableID, setTableID] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name");
    const [name, setname] = useState("");

    const fetchPostsTable = async (id: string) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/posts/${id}`
            );

            setname(res.data.name || "");
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMenu = async () => {
        try {
            const query = new URLSearchParams({ search, category }).toString();
            const response = await axios.get(
                `http://localhost:3000/api/menu?${query}`
            );
            setMenu(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/categories`
            );
            setCategories(response.data);
>>>>>>> 599b865 (Add new files and update imports)
        } catch (error) {
            console.error(error);
        }
    };

<<<<<<< HEAD
    const fetchMenu = async () => {
        try {
            const query = new URLSearchParams({ search, category }).toString();
            const response = await axios.get(
                `http://localhost:3000/api/menu?${query}`
            );
            setMenu(response.data);
        } catch (error) {
            console.error(error);
        }
    };
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
    const fetchCart = async () => {
        try {
            const response = await axios.get(`/api/Cart?tableID=${id}`);
            const cartData = response.data;
            const isItemInCart = cartData.some(
                (item: any) => item.status === "waiting to send.."
            );
            setIsInCart(isItemInCart);
            setcartID(cartData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleApplyFilters = () => {
        fetchMenu();
    };

    const buttonClass = isInCart
        ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
        : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full";

    useEffect(() => {
        fetchPostsTable(id);
        fetchMenu();
        fetchCategories();
        fetchCart();
    }, [id]);

    const handleAddToCart = async (menuId: number) => {
        try {
            const response = await axios.get(`/api/Cart?tableID=${id}`);
            const cartData = response.data;

            // หาว่ารายการนี้อยู่ในตะกร้าหรือไม่
            const itemInCart = cartData.find(
                (item: any) =>
                    item.menuID === menuId &&
                    item.status === "waiting to send.."
            );

            if (itemInCart) {
                // ถ้ารายการนี้อยู่ในตะกร้า ให้ลบออก
                await axios.delete(`/api/Cart/${itemInCart.id}`);
                setIsInCart(false); // กำหนดให้ isInCart เป็น false สำหรับรายการนี้
            } else {
                // ถ้ารายการนี้ไม่อยู่ในตะกร้า ให้เพิ่มเข้าไป
                await axios.post("/api/Cart", {
                    menuID: menuId,
                    quantity: 1,
                    tableID: id,
                    status: "waiting to send..",
                });
                setIsInCart(true); // กำหนดให้ isInCart เป็น true สำหรับรายการนี้
            }

            fetchCart(); // เรียกฟังก์ชัน fetchCart หลังจากเพิ่มหรือลบรายการในตะกร้า
        } catch (error) {
            console.error("Error adding/removing to/from cart:", error);
        }
    };

=======
    const handleApplyFilters = () => {
        fetchMenu();
    };

    useEffect(() => {
        fetchPostsTable(id);
        fetchMenu();
        fetchCategories();
    }, [id]);

    const handleAddToCart = async (menuId: number) => {
        try {
            await axios.post("/api/Cart", {
                menuID: menuId,
                quantity: 1,
                tableID: id, // ใช้ id จาก params
            });
            // แสดงข้อความแจ้งเตือนหรือทำการอื่น ๆ หลังจากเพิ่มรายการเสร็จสิ้น
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

>>>>>>> 599b865 (Add new files and update imports)
    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
<<<<<<< HEAD
                    <div className="flex justify-center items-center mb-6 py-3">
                        <div className="flex gap-1">
=======
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex gap-111">
>>>>>>> 599b865 (Add new files and update imports)
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
<<<<<<< HEAD

=======
>>>>>>> 599b865 (Add new files and update imports)
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>NAME</TableCell>
<<<<<<< HEAD
                                    <TableCell align="left">CATEGORY</TableCell>
                                    <TableCell align="center">
                                        QUANTITY
                                    </TableCell>
=======
                                    <TableCell>CATEGORY</TableCell>
                                    <TableCell>QUANTITY</TableCell>
>>>>>>> 599b865 (Add new files and update imports)
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {menu.map((menu: any) => (
                                    <TableRow key={menu.id}>
<<<<<<< HEAD
                                        <TableCell>
=======
                                        <TableCell
                                        >
>>>>>>> 599b865 (Add new files and update imports)
                                            <Typography variant="body1">
                                                {menu.name}
                                            </Typography>
                                        </TableCell>
<<<<<<< HEAD
                                        <TableCell align="left">
=======
                                        <TableCell
                                        >
>>>>>>> 599b865 (Add new files and update imports)
                                            <Typography variant="body1">
                                                {menu.category.name}
                                            </Typography>
                                        </TableCell>
<<<<<<< HEAD
                                        <TableCell align="center">
                                            <Box sx={{ minWidth: 120 }}>
                                                <Button
                                                    variant="contained"
                                                    className={
                                                        isInCartMap[menu.id]
                                                            ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                            : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                                    }
=======
                                        <TableCell
                                        >
                                            <Box sx={{ minWidth: 120 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
>>>>>>> 599b865 (Add new files and update imports)
                                                    onClick={() =>
                                                        handleAddToCart(menu.id)
                                                    }
                                                >
<<<<<<< HEAD
                                                    {isInCartMap[menu.id]
                                                        ? "Remove from Cart"
                                                        : "Add to Cart"}
=======
                                                    Add to Cart
>>>>>>> 599b865 (Add new files and update imports)
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

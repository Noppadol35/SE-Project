"use client";

import React, { useEffect, useState, useCallback } from "react";
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
    TableFooter,
    Grid,
    Snackbar,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const StickyHeadTable = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [page, setPage] = useState(0);
    const [cart, setCart] = useState<any[]>([]);
    const [menu, setMenu] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const [totals, setTotals] = useState<{ [key: string]: number }>({});
    const [open, setOpen] = useState(false);
    const [orderSent, setOrderSent] = useState(false);
    const [alert, setAlert] = useState("");
    const [status, setStatus] = useState("");

    const fetchPostsTable = useCallback(async (id: string) => {
        try {
            const res = await axios.get(
                `http://localhost:3000/api/posts/${id}`
            );
            setName(res.data.name || "");
        } catch (error) {
            console.error(error);
        }
    }, []);

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

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/categories`
            );
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchCart = useCallback(async () => {
        try {
            const response = await axios.get(`/api/Cart/${id}`);
            setCart(response.data);
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        fetchPostsTable(id);
        fetchCart();
        fetchMenu();
        fetchCategories();
    }, [id, fetchPostsTable, fetchCart, fetchMenu, fetchCategories]);

    useEffect(() => {
        const totalsMap: { [key: string]: number } = {};
        cart.forEach((item: any) => {
            if (item.status !== "pending.." && item.status !== "served") {
                const menuName = item.menu.name;
                totalsMap[menuName] =
                    (totalsMap[menuName] || 0) + item.quantity;
            }
        });
        setTotals(totalsMap);
    }, [cart]);

    const deletePost = async (id: Number) => {
        try {
            await axios.delete(`/api/Cart/${id}`);
            fetchCart();
            fetchMenu();
            fetchCategories();
        } catch (error) {
            console.error("Failed to delete the post", error);
        }
    };

    const handleClick = async () => {
        try {
            if (!orderSent && cart.length > 0) {
                setOrderSent(true);
                const itemsToOrder = cart.filter(
                    (item) => item.status === "waiting to send.."
                );
                if (itemsToOrder.length > 0) {
                    await Promise.all(
                        itemsToOrder.map(async (itemincart: any) => {
                            await axios.put(`/api/Cart/${itemincart.id}`, {
                                status: "pending..",
                            });
                        })
                    );
                    const orderData = itemsToOrder.map((item) => ({
                        menuID: item.menu.id,
                        menu: item.menu.name,
                        quantity: item.quantity,
                        tableID: id,
                        cartID: item.id,
                    }));
                    const response = await axios.post("/api/order", orderData);
                    if (response.status === 201) {
                        setOpen(true);
                        fetchCart();
                    } else {
                        console.log("Failed to create order.");
                    }
                } else {
                    console.log("No menu items in 'waiting to send..' status.");
                }
            }
        } catch (error) {
            console.error("Error creating order", error);
        }
    };

    const handleIncrement = async (key: any, ids: any) => {
        try {
            const [status, menuName] = key.split("-");
            const menuItem = cart.find(
                (item) => item.status === status && item.menu.name === menuName
            );
            if (menuItem) {
                const newQuantity = menuItem.quantity + 1;
                if (newQuantity <= 20) {
                    await axios.put(`/api/Cart/${menuItem.id}`, {
                        quantity: newQuantity,
                    });
                    fetchCart();
                } else {
                    setAlert("Cannot add more than 20 items.");
                }
            }
        } catch (error) {
            console.error("Failed to update cart item", error);
        }
    };

    const handleDelete = async (key: any, ids: any) => {
        try {
            const [status, menuName] = key.split("-");
            const menuItem = cart.find(
                (item) => item.status === status && item.menu.name === menuName
            );
            if (menuItem) {
                if (menuItem.quantity === 1) {
                    await deletePost(menuItem.id);
                } else {
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

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={8}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>
                                        YOUR ORDER
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">
                                        QUANTITY
                                    </TableCell>
                                    <TableCell align="center">NAME</TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        ADD/DEL
                                    </TableCell>
                                    <TableCell align="center">DELETE</TableCell>
                                    <TableCell align="center">STATUS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(
                                    cart.reduce((acc, curr) => {
                                        const { status, menu, quantity, id } =
                                            curr;
                                        const key = `${status}-${menu.name}`;
                                        acc[key] = acc[key] || {
                                            status,
                                            menuName: menu.name,
                                            quantity: 0,
                                            ids: [],
                                        };
                                        acc[key].quantity += quantity;
                                        acc[key].ids.push(id);
                                        return acc;
                                    }, {})
                                ).map(
                                    ([
                                        key,
                                        { status, menuName, quantity, ids },
                                    ]: any) => (
                                        <TableRow key={key}>
                                            <TableCell align="center">
                                                <Typography variant="body1">
                                                    {quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1">
                                                    {menuName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    disabled={
                                                        status ===
                                                            "pending.." ||
                                                        status === "served"
                                                    }
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                                    variant="contained"
                                                    startIcon={<AddIcon />}
                                                    onClick={() =>
                                                        handleIncrement(
                                                            key,
                                                            ids
                                                        )
                                                    }
                                                >
                                                    Increase
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    disabled={
                                                        status ===
                                                            "pending.." ||
                                                        status === "served"
                                                    }
                                                    className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-full"
                                                    variant="contained"
                                                    startIcon={
                                                        quantity > 1 ? (
                                                            <RemoveIcon />
                                                        ) : (
                                                            <DeleteIcon />
                                                        )
                                                    }
                                                    onClick={() =>
                                                        handleDelete(key, ids)
                                                    }
                                                >
                                                    {quantity > 1
                                                        ? "Decrease"
                                                        : "Delete"}
                                                </Button>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1">
                                                    {status}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>
                                        DETAIL
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={3}>
                                        NAME
                                    </TableCell>
                                    <TableCell align="center" colSpan={2}>
                                        QTY.
                                    </TableCell>
                                </TableRow>
                                {Object.entries(totals).map(
                                    ([menuName, total]) => (
                                        <TableRow key={menuName}>
                                            <TableCell
                                                align="center"
                                                colSpan={3}
                                            >
                                                <Typography variant="body1">
                                                    {menuName}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                colSpan={2}
                                            >
                                                <Typography variant="body1">
                                                    {total}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>
                                        {cart.some(
                                            (item) =>
                                                item.status !== "pending.." &&
                                                item.status !== "served"
                                        ) ? (
                                            <Button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                                                variant="contained"
                                                onClick={handleClick}
                                            >
                                                SEND ORDER
                                            </Button>
                                        ) : (
                                            <Typography variant="body1">
                                                NO MENU IN CART!!
                                            </Typography>
                                        )}
                                        <Snackbar
                                            open={open}
                                            autoHideDuration={4000}
                                            onClose={handleClose}
                                        >
                                            <Alert
                                                onClose={handleClose}
                                                severity="success"
                                                variant="filled"
                                                sx={{ width: "100%" }}
                                            >
                                                Your order is complete. Please
                                                wait to receive your food.
                                            </Alert>
                                        </Snackbar>
                                        <Snackbar
                                            open={alert !== ""}
                                            autoHideDuration={3000}
                                            onClose={() => setAlert("")}
                                            anchorOrigin={{
                                                vertical: "top",
                                                horizontal: "center",
                                            }}
                                        >
                                            <Alert
                                                onClose={() => setAlert("")}
                                                severity="error"
                                                sx={{ width: "100%" }}
                                            >
                                                {alert}
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
    );
};

export default StickyHeadTable;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// ===========================[MUI material & Icon]============================
import {
    Alert,
    AlertTitle,
    FormControl,
    FormLabel,
    Box,
    Grid,
    Typography,
    Button,
    CssBaseline,
    Modal,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogTitle,
} from "@mui/material";
import {
    TableRestaurant as TableRestaurantIcon,
    QrCode as QrCodeIcon,
    PointOfSale as PointOfSaleIcon,
} from "@mui/icons-material";

// ===========================[Import Components]============================
import { TableEntity } from "@/types/entity";
import Navbar from "@/components/Dashboard/Chef/components/Navbar";

const styling = {
    container: {
        paddingRight: 2,
        paddingBottom: 2,
    },
};

const buttonStyle = {
    bgcolor: "#FF0000",
    border: "1px black solid",
    p: 1,
    "&:hover": {
        bgcolor: "#FBFADA",
    },
};

export default function Home() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [statusEnum, setStatusEnum] = useState<TableEntity[]>([]);
    const [capacity, setCapacity] = useState("");
    const [posts, setPosts] = useState<TableEntity[]>([]);

    const [sideCapacity, setSideCapacity] = useState(0);
    const [sideStatus, setSideStatus] = useState("");
    const [sideName, setSideName] = useState("");
    const [sideId, setSideId] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`/api/posts`);
            setPosts(res.data);
        };
        fetch();
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await axios.put(`/api/posts/${sideId}`, {
                name: sideName,
                capacity: sideCapacity,
                status: sideStatus,
            });

            setPosts(
                posts.map((post) => (post.id === sideId ? res.data : post))
            );
            setOpen(false);
            window.open(
                `http://localhost:3000/dashboard/cashier/receipt/${sideId}`,
                "_blank"
            );
        } catch (error) {
            console.error(error);
            setOpen(false);
        }
    };

    const handleSubmit2 = async () => {
        try {
            await axios.put(`/api/posts/${sideId}`, {
                name: sideName,
                capacity: sideCapacity,
                status: sideStatus,
            });
            router.push("/cashierPage");
        } catch (error) {
            console.error(error);
        }
    };

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleClickOpen = () => {
        if (
            !sideCapacity ||
            isNaN(Number(sideCapacity)) ||
            Number(sideCapacity) <= 0
        ) {
            setShowError(true);
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const getTableColor = (status: string) => {
        return status === "EATING" ? "#FF0000" : "#00FF00";
    };

    const handleTableClick = (table: TableEntity) => () => {
        setSideId(table.id);
        setSideName(table.name);
        setSideCapacity(table.capacity);
        setSideStatus(table.StatusEnum);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar />
            <CssBaseline />

            <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={8} md={8}>
                    <Box
                        height="auto"
                        bgcolor={"#FFFFFF"}
                        my={0}
                        gap={0}
                        p={5}
                        sx={{ borderTop: "3px solid #12372A" }}
                    >
                        <Grid
                            spacing={5}
                            alignItems="center"
                            justifyContent="center"
                            container
                        >
                            {posts.map((table: TableEntity) => (
                                <Grid
                                    key={table.id}
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    sx={styling.container}
                                    textAlign="center"
                                >
                                    <Button
                                        sx={{
                                            ...buttonStyle,
                                            bgcolor: "#FFFFFF",
                                            border: `1px solid ${getTableColor(
                                                table.StatusEnum
                                            )}`,
                                            boxShadow:
                                                "0px 2px 5px 3px rgba(0, 0, 0, 0.38)",
                                            p: 2,
                                        }}
                                        variant="contained"
                                        onClick={handleTableClick(table)}
                                    >
                                        <Box
                                            height={80}
                                            width={100}
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{ border: "0px solid #12372A" }}
                                        >
                                            <Typography
                                                fontSize={20}
                                                sx={{ color: "#6D6F6F" }}
                                            >
                                                {table.name}
                                            </Typography>
                                            <Typography
                                                sx={{ color: "#436850" }}
                                            >
                                                {table.StatusEnum}
                                            </Typography>

                                            <TableRestaurantIcon
                                                sx={{
                                                    fontSize: "large",
                                                    color: "#6D6F6F",
                                                }}
                                            />
                                        </Box>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={4} md={4}>
                    {/* ส่วนแสดงรายละเอียดโต๊ะ */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Box
                            bgcolor="#EEEEEE"
                            height="70vh"
                            my={0}
                            display="flex"
                            flexDirection="column"
                            gap={1}
                            p={1}
                            sx={{
                                border: "3px solid #12372A",
                                "@media (max-width: 598px)": {
                                    bgcolor: "#EEEEEE",
                                    height: "auto",
                                    my: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    p: 1,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                }}
                            >
                                <Typography variant="h3" component="h2">
                                    {sideName}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Status: {sideStatus}
                                </Typography>
                            </Box>

                            <TextField
                                id="Capacity"
                                label="PEOPLE"
                                type="number"
                                value={sideCapacity}
                                onChange={(e) =>
                                    setSideCapacity(parseInt(e.target.value))
                                }
                            />
                            {showError && (
                                <Alert
                                    variant="filled"
                                    severity="error"
                                    onClose={() => setShowError(false)}
                                >
                                    <AlertTitle>Error</AlertTitle>
                                    Please enter a valid number for Capacity
                                </Alert>
                            )}
                            <FormControl>
                                <FormLabel>Sizes</FormLabel>
                                <RadioGroup
                                    defaultValue={sideStatus}
                                    name="radio-buttons-group"
                                    value={sideStatus}
                                    onChange={(e) =>
                                        setSideStatus(e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="IDLE"
                                        control={<Radio color="warning" />}
                                        label="IDLE"
                                    />
                                    <FormControlLabel
                                        value="EATING"
                                        control={<Radio color="primary" />}
                                        label="EATING"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                        {/* ส่วนแสดงปุ่ม ปริ้น QR, ปุ่ม Checkout */}

                        <div>
                            <Box
                                bgcolor="#EEEEEE"
                                height="auto"
                                my="0rem"
                                display="flex"
                                flexDirection="column"
                                gap="1rem"
                                p="1rem"
                                sx={{
                                    border: "3px solid #12372A",
                                    alignItems: "center",
                                }}
                            >
                                <React.Fragment>
                                    <Button
                                        sx={{
                                            background: "#ADBC9F",
                                            border: "1px solid #12372A",
                                            p: 3,
                                        }}
                                        variant="contained"
                                        onClick={handleClickOpen}
                                        startIcon={
                                            <QrCodeIcon
                                                sx={{
                                                    fontSize: "large",
                                                    color: "white",
                                                }}
                                            />
                                        }
                                    >
                                        Print QRCODE
                                    </Button>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>
                                            CONFIRM PRINT QRCODE ?
                                        </DialogTitle>

                                        <DialogActions>
                                            <Button
                                                autoFocus
                                                onClick={handleClose}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSubmit}>
                                                CONFIRM
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </React.Fragment>

                                <React.Fragment>
                                    <Button
                                        sx={{
                                            bgcolor: "#ADBC9F",
                                            border: "1px solid #12372A",
                                            p: 3,
                                        }}
                                        variant="contained"
                                        onClick={handleClickOpen2}
                                        startIcon={
                                            <PointOfSaleIcon
                                                sx={{
                                                    fontSize: "large",
                                                    color: "white",
                                                }}
                                            />
                                        }
                                    >
                                        CHECKOUT
                                    </Button>
                                    <Dialog open={open2} onClose={handleClose2}>
                                        <DialogTitle>
                                            CONFIRM CHECKOUT ?
                                        </DialogTitle>

                                        <DialogActions>
                                            <Button
                                                autoFocus
                                                onClick={handleClose2}
                                            >
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSubmit2}>
                                                CONFIRM
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </React.Fragment>
                            </Box>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </Box>
    );
}

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
} from "@mui/material";
import { styled } from "@mui/material/styles";

import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Tooltip from "@mui/material/Tooltip";

const TableContainerStyled = styled(TableContainer)({});

const TableCellStyled = styled(TableCell)({
    padding: "12px",
    borderBottom: "1px solid #dddddd",
});

const TableHeadCellStyled = styled(TableCell)({
    backgroundColor: "#f2f2f2",
    fontWeight: "bold",
    borderBottom: "1px solid #dddddd",
});

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
    };

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

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <div>
            <TableContainer component={Paper}>
                <TableContainerStyled>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableHeadCellStyled>Name</TableHeadCellStyled>
                            <TableHeadCellStyled>Action</TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu.map((menu: any) => (
                            <TableRow key={menu.id}>
                                <TableCell>
                                    <TableCellStyled>
                                        <Typography variant="body1">
                                            {menu.name}
                                        </Typography>
                                    </TableCellStyled>
                                </TableCell>
                                <TableCell>
                                    <TableCellStyled>
                                        <Tooltip title="Add to cart" arrow>
                                            <IconButton>
                                                <AddShoppingCartOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCellStyled>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainerStyled>
            </TableContainer>
            <TableContainerStyled>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableHeadCellStyled>Name</TableHeadCellStyled>
                            <TableHeadCellStyled>Action</TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menu.map((menu: any) => (
                            <TableRow key={menu.id}>
                                <TableCell>
                                    <TableCellStyled>
                                        <Typography variant="body1">
                                            {menu.name}
                                        </Typography>
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <Tooltip title="Add to cart" arrow>
                                            <IconButton>
                                                <AddShoppingCartOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCellStyled>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainerStyled>
        </div>
    );
};

export default QuantityControl;

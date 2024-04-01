"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const rows = [
    {
        id: 1,
        total: "299",
        table: 1,
        guest: 110,
        status: "Paied",
    },
    {
        id: 2,
        total: "318",
        table: 4,
        guest: 111,
        status: "Paied",
    },
    {
        id: 3,
        total: "299",
        table: 5,
        guest: 112,
        status: "Paied",
    },
    {
        id: 4,
        total: "359",
        table: 9,
        guest: 114,
        status: "Paied",
    },
];

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export function Userhistory() {
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="font-bold">
                                Table
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Guest
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Total Price
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    {row.table}
                                </TableCell>
                                <TableCell align="center">
                                    {row.guest}
                                </TableCell>
                                <TableCell align="center">
                                    {row.total}
                                </TableCell>
                                <TableCell align="center">
                                    {row.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

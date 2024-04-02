"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

import axios from "axios";
import { Bill } from "@/types/entity";

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
    let [rows, setRows] = React.useState<Bill[]>([]);

    React.useEffect(() => {
        axios.get("http://localhost:3000/api/history").then((res) => {
            setRows(res.data);
            console.log(res.data);
        });
    }, []);

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
                            <TableCell align="center" className="font-bold">
                                Date
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
                                    {row.table?.id}
                                </TableCell>
                                <TableCell align="center">
                                    {row.guest?.id}
                                </TableCell>
                                <TableCell align="center">
                                    {row.total}
                                </TableCell>
                                <TableCell align="center">
                                    {row.status}
                                </TableCell>
                                <TableCell align="center">
                                    {moment(row.date).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

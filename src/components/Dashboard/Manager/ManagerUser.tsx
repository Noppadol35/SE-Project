import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddUser from "@/components/Dashboard/Manager/add/AddUser";
import EditUser from "@/components/Dashboard/Manager/edit/EditUser";

import DeleteUser from "@/components/Dashboard/Manager/delete/deleteUser";

const rows = [
    {
        id: 1,
        name: "อรรถพร ศึกสพ",
        phone: "0923942293",
        email: "new@gmail.com",
        password: "1212312121",
        role: "MANAGER",
    },
    {
        id: 2,
        name: "นพดล พรมเทศ",
        phone: "0654943309",
        email: "purm@gmail.com",
        password: "10101011",
        role: "CASHIER",
    },
    {
        id: 3,
        name: "วรวิบูล มั่งมี",
        phone: "0987654321",
        email: "ohm@gmail.com",
        password: "00110022",
        role: "WAITER",
    },
    {
        id: 4,
        name: "ธนพ แสงจันทร์",
        phone: "0983213321",
        email: "view@gmail.com",
        password: "112232211",
        role: "CHEF",
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

export function UserData() {
    return (
        <div>
            <Grid container justifyContent="flex-end" marginBottom={2}>
                <AddUser />
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className="font-bold">
                                No.
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Name
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Phone
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Email
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Password
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Role
                            </TableCell>
                            <TableCell
                                align="center"
                                className="font-bold"
                            ></TableCell>
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
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.phone}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">
                                    {row.password}
                                </TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                                <TableCell align="center">
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <EditUser userData={row} />
                                        <Button
                                            style={{
                                                minWidth: 5,
                                                padding: 3,
                                            }}
                                        >
                                            <DeleteUser />
                                        </Button>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

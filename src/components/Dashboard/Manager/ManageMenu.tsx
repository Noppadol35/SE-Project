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
import AddMenu from "@/components/Dashboard/Manager/add/AddMenu";
import EditMenu from "@/components/Dashboard/Manager/edit/EditMenu";
import DeleteMenu from "./delete/deleteMenu";

const rows = [
    {
        id: 1,
        name: "เต้าหู้ชีส",
        price: 0,
        image: "null",
        category: "FOOD",
        cart: "null",
    },
    {
        id: 2,
        name: "สันนอกสไลด์หมู",
        price: 0,
        image: "null",
        category: "FOOD",
        cart: "null",
    },
    {
        id: 3,
        name: "ชีสทอด",
        price: 0,
        image: "null",
        category: "SNACK",
        cart: "null",
    },
    {
        id: 4,
        name: "ไอติมกะทิ",
        price: 0,
        image: "null",
        category: "DESSERT",
        cart: "null",
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

export function Usermenu() {
    function handleEditClick(Name: string) {}

    return (
        <div>
            <Grid container justifyContent="flex-end" marginBottom={2}>
                <AddMenu />
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
                                Category
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
                                    {row.category}
                                </TableCell>
                                <TableCell align="center">
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <EditMenu menuData={row} />
                                        <Button
                                            style={{
                                                minWidth: 5,
                                                padding: 3,
                                                color: "grey",
                                            }}
                                        >
                                            <DeleteMenu />
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

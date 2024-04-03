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

import { Menu } from "@/types/entity";
import axios from "axios";



export function Usermenu() {
    let [rows, setRows] = React.useState<Menu[]>([]);

    React.useEffect(() => {
        axios.get("http://localhost:3000/api/menu").then((res) => {
            setRows(res.data);
            console.log(res.data);
        });
    }, []);

    const [menus, setCategories] = React.useState([]);
    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/categories`).then((res) => {
            setCategories(res.data);
            console.log(res.data);
        });
    }, []);


    React.useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:3000/api/menu").then((res) => {
                setRows(res.data);
                console.log("Data updated");
            });
        }, 5000); // ตั้งเวลาในการ Refech ข้อมูลทุก 5 วินาที

        return () => clearInterval(interval);
    }, [rows]);
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
                        {rows.map((row: any) => (
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
                                    {row.category.name}
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
                                            <DeleteMenu menuData={row} />
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

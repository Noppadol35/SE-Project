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
import axios from "axios";

import DeleteUser from "@/components/Dashboard/Manager/delete/deleteUser";
import { User } from "@/types/entity";


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
    let [rows, setRows] = React.useState<User[]>([]);

    React.useEffect(() => {
        axios.get("/api/user").then((res) => {
            setRows(res.data);
            console.log(res.data);
            
        });
    }, []);

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
                                Name
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Phone
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Email
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
                                
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.phone}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
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
                                            <DeleteUser userData={row}/>
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

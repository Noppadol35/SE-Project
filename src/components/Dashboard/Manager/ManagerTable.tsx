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
import EditTable from "@/components/Dashboard/Manager/edit/EditTable";
import AddTable from "@/components/Dashboard/Manager/add/AddTable";
import DeleteTable from "@/components/Dashboard/Manager/delete/deleteTable";

const rows = [
    {
        id: 1,
        name: "Table 1",
        number: 1,
        capacity: 5,
        status: "AVAILABLE",
        order: "null",
        cart: "null",
        bill: "null",
    },
    {
        id: 2,
        name: "Table 2",
        number: 2,
        capacity: 4,
        status: "AVAILABLE",
        order: "null",
        cart: "null",
        bill: "null",
    },
    {
        id: 3,
        name: "Table 3",
        number: 3,
        capacity: 6,
        status: "AVAILABLE",
        order: "null",
        cart: "null",
        bill: "null",
    },
    {
        id: 4,
        name: "Table 4",
        number: 4,
        capacity: 2,
        status: "AVAILABLE",
        order: "null",
        cart: "null",
        bill: "null",
    },
];

export function UserTable() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Grid container justifyContent="flex-end" marginBottom={2}>
                <AddTable />
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
                                Status
                            </TableCell>
                            <TableCell align="center" className="font-bold">
                                Capacity
                            </TableCell>
                            <TableCell align="center"></TableCell>
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
                                    {row.number}
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.status}
                                </TableCell>
                                <TableCell align="center">
                                    {row.capacity}
                                </TableCell>
                                <TableCell align="center">
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <EditTable userTable={row} />
                                        <Button
                                            style={{
                                                minWidth: 5,
                                                padding: 3,
                                                color: "grey",
                                            }}
                                        >
                                            <DeleteTable />
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

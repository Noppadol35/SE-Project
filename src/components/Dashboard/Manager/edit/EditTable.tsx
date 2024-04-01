import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import * as yup from "yup";
import { MenuItem, Select, TextField } from "@mui/material";

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

interface EditTableProps {
    userTable: {
        id: number;
        name: string;
        capacity: number;
        status: string;
        order: string;
        cart: string;
        bill: string;
    };
}

export default function EditTable(props: EditTableProps) {
    const { userTable } = props;
    let [inputName, setInputName] = useState("");
    let [inputCapacity, setInputCapacity] = useState(0);
    let [inputStatus, setInputStatus] = useState("AVAILABLE");
    React.useEffect(() => {
        setInputName(userTable.name);
        setInputCapacity(userTable.capacity);
        setInputStatus(userTable.status);
    }, [userTable]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        capacity: yup
            .string()
            .matches(/^[0-9]+$/, "Capacity must be a number")
            .min(1, "Capacity must be at least 1 characters"),
        status: yup.string().required("Status is required"),
    });

    const [errorName, setErrorName] = useState(false);
    const [errorCapacity, setErrorCapacity] = useState(false);

    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorCapacity, setTextErrorCapacity] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    name: inputName,
                    capacity: inputCapacity,
                    role: inputStatus,
                },
                { abortEarly: false }
            );
        } catch (error: any) {
            error.inner.forEach((e: any) => {
                if (e.path === "name") {
                    setTextErrorName(e.message);
                    setErrorName(true);
                }
                if (e.path === "capacity") {
                    setTextErrorCapacity(e.message);
                    setErrorCapacity(true);
                }
            });
        }

        if (!errorName && !errorCapacity) {
            console.log("Pass validation");
            console.log("Name: ", inputName);
            console.log("Capacity: ", inputCapacity);

            console.log("Status: ", inputStatus);

            //api call---------------------------------------

            setInputName("");
            setInputCapacity(0);
        }
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                style={{ minWidth: 5, padding: 3, color: "grey" }}
            >
                <EditIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit table information
                    </Typography>
                    <br />

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name*"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            error={errorName}
                            helperText={textErrorName}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <TextField
                            label="Capacity*"
                            type="number"
                            value={inputCapacity}
                            onChange={(e) =>
                                setInputCapacity(parseInt(e.target.value))
                            }
                            error={errorCapacity}
                            helperText={textErrorCapacity}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <Select
                            value={inputStatus}
                            label="Status*"
                            onChange={(e) => setInputStatus(e.target.value)}
                        >
                            <MenuItem value={"AVAILABLE"} selected>
                                Available
                            </MenuItem>
                            <MenuItem value={"UNAVAILABLE"}>
                                Unavailable
                            </MenuItem>
                        </Select>
                        <br />
                        <br />
                        <Button type="submit" variant="outlined">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

"use client";
import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

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

interface EditUserProps {
    userData: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
    };
}

export default function EditUser(props: EditUserProps) {
    const { userData } = props;
    let [inputName, setInputName] = useState("");
    let [inputEmail, setInputEmail] = useState("");
    let [inputPhone, setInputPhone] = useState("");
    let [inputRole, setInputRole] = useState("WAITER");
    React.useEffect(() => {
        setInputName(userData.name);
        setInputEmail(userData.email);
        setInputPhone(userData.phone);
        setInputRole(userData.role);
    }, [userData]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        phone: yup
            .string()
            .matches(/^[0-9]+$/, "Phone must be a number")
            .min(10, "Phone must be at least 10 characters"),
        role: yup.string().required("Role is required"),
    });

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);

    let [textErrorEmail, setTextErrorEmail] = useState("");
    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorPhone, setTextErrorPhone] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    name: inputName,
                    email: inputEmail,
                    phone: inputPhone,
                    role: inputRole,
                },
                { abortEarly: false }
            );
        } catch (validationError: any) {
            validationError.inner.forEach((e: any) => {
                if (e.path === "name") {
                    setTextErrorName(e.message);
                    setErrorName(true);
                }
                if (e.path === "email") {
                    setTextErrorEmail(e.message);
                    setErrorEmail(true);
                }
                if (e.path === "phone") {
                    setTextErrorPhone(e.message);
                    setErrorPhone(true);
                }
            });
            return;
        }

        console.log("Pass validation");
        console.log("Name: ", inputName);
        console.log("Email: ", inputEmail);
        console.log("Phone: ", inputPhone);
        console.log("Role: ", inputRole);


        try {
            const res = await axios.put(`/api/user/${userData.id}`, {
                name: inputName,
                email: inputEmail,
                phone: inputPhone,
                role: inputRole,
            });
            window.close();
            console.log(res.data);
        } catch (error) {
            console.log("Error while submitting form:", error);
            // Handle network errors, server errors, etc.
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
                        Edit employee information
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
                            label="Email*"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                            error={errorEmail}
                            helperText={textErrorEmail}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <TextField
                            label="Phone"
                            value={inputPhone}
                            onChange={(e) => setInputPhone(e.target.value)}
                            error={errorPhone}
                            helperText={textErrorPhone}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <Select
                            value={inputRole}
                            label="Role"
                            onChange={(e) => setInputRole(e.target.value)}
                        >
                            <MenuItem value={"WAITER"} selected>
                                Waiter
                            </MenuItem>
                            <MenuItem value={"MANAGER"}>Manager</MenuItem>
                            <MenuItem value={"CASHIER"}>Cashier</MenuItem>
                            <MenuItem value={"CHEF"}>Chef</MenuItem>
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

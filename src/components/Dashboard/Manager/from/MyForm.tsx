import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { MenuItem, Select } from "@mui/material";

const MyForm = () => {
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

    let [inputName, setInputName] = useState("");
    let [inputEmail, setInputEmail] = useState("");
    let [inputPhone, setInputPhone] = useState("");
    let [inputRole, setInputRole] = useState("WAITER");

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPhone, setErrorPhone] = useState(false);

    let [textErrorEmail, setTextErrorEmail] = useState("");
    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorPhone, setTextErrorPhone] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
        } catch (error: any) {
            error.inner.forEach((e: any) => {
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
        }

        if (!errorName && !errorEmail && !errorPhone) {
            console.log("Pass validation");
            console.log("Name: ", inputName);
            console.log("Email: ", inputEmail);
            console.log("Phone: ", inputPhone);
            console.log("Role: ", inputRole);

            //api call---------------------------------------

            setInputName("");
            setInputEmail("");
            setInputPhone("");
        }
    };

    return (
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
    );
};

export default MyForm;

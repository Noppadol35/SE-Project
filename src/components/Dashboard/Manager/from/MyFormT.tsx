import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { MenuItem, Select } from "@mui/material";

const MyFormT = () => {
    const schema = yup.object().shape({
        number: yup
            .string()
            .matches(/^[0-9]+$/, "Number must be a number")
            .min(1, "Number must be at least 1 characters"),
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

    let [inputNumber, setInputNumber] = useState("");
    let [inputName, setInputName] = useState("");
    let [inputCapacity, setInputCapacity] = useState("");
    let [inputStatus, setInputStatus] = useState("AVAILABLE");

    const [errorNumber, setErrorNumber] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorCapacity, setErrorCapacity] = useState(false);

    let [textErrorNumber, setTextErrorNumber] = useState("");
    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorCapacity, setTextErrorCapacity] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    number: inputNumber,
                    name: inputName,
                    capacity: inputCapacity,
                    role: inputStatus,
                },
                { abortEarly: false }
            );
        } catch (error: any) {
            error.inner.forEach((e: any) => {
                if (e.path === "number") {
                    setTextErrorNumber(e.message);
                    setErrorNumber(true);
                }
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

        if (!errorName && !errorNumber && !errorCapacity) {
            console.log("Pass validation");
            console.log("Number: ", inputNumber);
            console.log("Name: ", inputName);
            console.log("Capacity: ", inputCapacity);

            console.log("Status: ", inputStatus);

            //api call---------------------------------------

            setInputNumber("");
            setInputName("");
            setInputCapacity("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Number*"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                error={errorNumber}
                helperText={textErrorNumber}
                sx={{ width: "300px", marginBottom: "10px" }}
            />
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
                value={inputCapacity}
                onChange={(e) => setInputCapacity(e.target.value)}
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
                <MenuItem value={"UNAVAILABLE"}>Unavailable</MenuItem>
            </Select>
            <br />
            <br />
            <Button type="submit" variant="outlined">
                Submit
            </Button>
        </form>
    );
};

export default MyFormT;

import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
// import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const MyFormT = () => {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        capacity: yup
            .number()
            .positive("Capacity must be a positive number")
            .integer("Capacity must be an integer")
            .required("Capacity is required"),
        status: yup.string().required("Status is required"),
    });

    let [inputName, setInputName] = useState("");
    let [inputCapacity, setInputCapacity] = useState(0);
    // let [inputStatus, setInputStatus] = useState("IDLE");

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
                    name: inputName,
                    capacity: inputCapacity,
                    
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
            console.log("Name: ", inputName);
            console.log("Capacity: ", inputCapacity);
            // console.log("Status: ", inputStatus);

            try {
                console.log("Submitting form");
                
                const res = await axios.post("/api/posts", {
                    name: inputName,
                    capacity: inputCapacity,
                    statusID: 1,
                    
                });
                console.log("Response: ", res);
            } catch (error) {
                console.error("Error while submitting form:", error);
            }
            setInputName("");
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
                label="Capacity*"
                type="number"
                value={inputCapacity}
                onChange={(e) => setInputCapacity(parseInt(e.target.value))}
                error={errorCapacity}
                helperText={textErrorCapacity}
                sx={{ width: "300px", marginBottom: "10px" }}
            />
            {/* <Select
                value={inputStatus}
                label="Status*"
                onChange={(e) => setInputStatus(e.target.value)}
            >
                <MenuItem value={"IDLE"} selected>
                    IDLE
                </MenuItem>
                <MenuItem value={"EATTING"}>EATTING</MenuItem>
                <MenuItem value={"PAID"}>PAID</MenuItem>
            </Select> */}
            <br />
            <br />
            <Button type="submit" variant="outlined">
                Submit
            </Button>
        </form>
    );
};

export default MyFormT;

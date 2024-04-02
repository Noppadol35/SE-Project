import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const MyFormM = () => {
    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        price: yup
            .number()
            .required("Price is required")
            .positive("Price must be a positive number"),
        category: yup.string().required("Category is required"),
    });

    let [open, setOpen] = useState(false);

    let handleOpen = () => {
        setOpen(true);
    };

    let handleClose = () => {
        setOpen(false);
    }

    let [inputName, setInputName] = useState("");
    let [inputPrice, setInputPrice] = useState(0);
    let [inputCategory, setInputCategory] = useState("FOOD");

    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorPrice, setTextErrorPrice] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    name: inputName,
                    price: inputPrice,
                    category: inputCategory,
                },
                { abortEarly: false }
            );
        } catch (error: any) {
            error.inner.forEach((e: any) => {
                if (e.path === "name") {
                    setTextErrorName(e.message);
                    setErrorName(true);
                }
                if (e.path === "price") {
                    setTextErrorPrice(e.message);
                    setErrorPrice(true);
                }
            });
        }

        if (!errorName && !errorPrice) {
            console.log("Pass validation");
            console.log("Name: ", inputName);
            console.log("Price: ", inputPrice);
            console.log("Category: ", inputCategory);

            try {
                const res = await axios.post("/api/menus", {
                    name: inputName,
                    price: inputPrice,
                    category: inputCategory,
                });
                handleClose();
                console.log(res.data);
            } catch (error) {
                console.error(error);
            }

            setInputName("");
            setInputPrice(0);
            setInputCategory("FOOD");
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
                label="Price*"
                type="number"
                value={inputPrice}
                onChange={(e) => setInputPrice(parseInt(e.target.value))}
                error={errorPrice}
                helperText={textErrorPrice}
                sx={{ width: "300px", marginBottom: "10px" }}
            />
            <Select
                value={inputCategory}
                label="Category"
                onChange={(e) => setInputCategory(e.target.value)}
            >
                <MenuItem value={"FOOD"} selected>
                    FOOD
                </MenuItem>
                <MenuItem value={"DRINK"}>DRINK</MenuItem>
                <MenuItem value={"DESSERT"}>DESSERT</MenuItem>
            </Select>
            <br />
            <br />
            <Button type="submit" variant="outlined">
                Submit
            </Button>
        </form>
    );
};

export default MyFormM;

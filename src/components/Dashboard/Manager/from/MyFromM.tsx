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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [inputName, setInputName] = useState("");
    let [inputPrice, setInputPrice] = useState(0);
    let [inputCategory, setInputCategory] = useState("FOOD");

    const [errorName, setErrorName] = useState(false);
    const [errorPrice, setErrorPrice] = useState(false);

    let [textErrorName, setTextErrorName] = useState("");
    let [textErrorPrice, setTextErrorPrice] = useState("");

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/categories/`).then((res) => {
            setCategories(res.data);
        });
        console.log(setCategories);
    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    name,

                    categoryID: Number(categoryID),
                },
                { abortEarly: false }
            );
            handleClose();
        } catch (error: any) {
            error.inner.forEach((e: any) => {
                if (e.path === "name") {
                    setTextErrorName(e.message);
                    setErrorName(true);
                }
            });
        }

        if (!errorName && !errorPrice) {
            console.log("Pass validation");
            console.log("Name: ", name);

            console.log("Category: ", categoryID);

            try {
                const res = await axios.post("/api/menu", {
                    name,
                    categoryID: Number(categoryID),
                });

                console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errorName}
                helperText={textErrorName}
                sx={{ width: "300px", marginBottom: "10px" }}
            />
            <TextField
                label="Price*"
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                error={errorPrice}
                helperText={textErrorPrice}
                sx={{ width: "300px", marginBottom: "10px" }}
            />
            <Select
                id="category"
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
            >
                {categories.map((cat: any) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
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

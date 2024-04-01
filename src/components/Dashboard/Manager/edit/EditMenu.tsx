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

interface EditMenuProps {
    menuData: {
        id: number;
        name: string;
        price: number;
        image: string;
        category: string;
        cart: string;
    };
}

export default function EditMenu(props: EditMenuProps) {
    const { menuData } = props;
    let [inputName, setInputName] = useState("");
    let [inputPrice, setInputPrice] = useState(0);
    let [inputCategory, setInputCategory] = useState("FOOD");
    React.useEffect(() => {
        setInputName(menuData.name);
        setInputPrice(menuData.price);
        setInputCategory(menuData.category);
    }, [menuData]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters"),
        price: yup
            .string()
            .matches(/^[0-9]+$/, "Price must be a number")
            .min(1, "Price must be at least 1 characters"),
        category: yup.string().required("Category is required"),
    });

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

            //api call---------------------------------------

            setInputName("");
            setInputPrice(0);
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
                        Edit menu information
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
                            label="Price*"
                            value={inputPrice}
                            onChange={(e) =>
                                setInputPrice(parseFloat(e.target.value))
                            }
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
                                Food
                            </MenuItem>
                            <MenuItem value={"SNACK"}>Snack</MenuItem>
                            <MenuItem value={"DESSERT"}>Dessert</MenuItem>
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

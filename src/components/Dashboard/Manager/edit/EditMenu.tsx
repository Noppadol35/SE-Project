import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import * as yup from "yup";
import { MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";

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
        category: string;
    };
}

export default function EditMenu(props: EditMenuProps) {
    const { menuData } = props;
    

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

    const [categoryID, setCategoryID] = React.useState("");
    const [categories, setCategories] = React.useState([]);
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');

    const [posts, setPosts] = React.useState([]);


    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/menu/${props.menuData.id}`).then((res) => {
            setName(res.data.name || "");
            setPrice(res.data.price || "")
            setCategoryID(res.data.categoryID || "");
        });
        console.log(name);
    }, [props.menuData.id]);

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
                    name: name,
                    categoryID,
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

        console.log("Pass validation");
        console.log("Name: ", name);
        console.log("Price: ", price);
        console.log("Category: ", categoryID);

        try {
            const res = await axios.put(`/api/menu/${menuData.id}`, {
                name: name,
                price: price,
                categoryID,
            });
            console.log(res.data);
            handleClose();
        } catch (error) {
            console.error(error);
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errorName}
                            helperText={textErrorName}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <Select
                            id="category"
                            value={categoryID}
                            onChange={(e) => setCategoryID(e.target.value)}
                        >
                            {categories.map((cat: any) => (
                                <MenuItem key={cat.id}
                                    value={cat.id} >

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
                </Box>
            </Modal>
        </div>
    );
}

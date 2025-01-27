import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import * as yup from "yup";
import { FormControlLabel, MenuItem, Select, TextField } from "@mui/material";
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

interface EditTableProps {
    userTable: {
        id: string;
        name: string;
        capacity: number;
        status: string;
    };
}

export default function EditTable(props: EditTableProps) {



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

    const [statusID, setStatus] = React.useState("");
    const [statuss, setStatuss] = React.useState([]);
    const [name, setName] = React.useState('');
    const [capacity, setCapacity] = React.useState("");

    const [posts, setPosts] = React.useState([]);


    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/posts/${props.userTable.id}`).then((res) => {
            setName(res.data.name || "");
            setCapacity(res.data.capacity);
            setStatus(res.data.statusID || "");
        });
        console.log(statuss);
    }, [props.userTable.id, statuss]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/api/statuss/`).then((res) => {
            setStatuss(res.data);

        });
        console.log(statuss);
    }, [statuss]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await schema.validate(
                {
                    name: name,
                    capacity: capacity,
                    statusID,
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

        console.log("Pass validation");
        console.log("Name: ", name);
        console.log("Capacity: ", capacity);
        console.log("Status: ", statusID);

        try {
            const res = await axios.put(`/api/posts/${props.userTable.id}`, {
                name: name,
                capacity: Number(capacity) as number,
                statusID,
            });
            console.log(res);
            handleClose();
        } catch (error) {
            console.log(" Error While sumitting form :", error);
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
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errorName}
                            helperText={textErrorName}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <TextField
                            id="Capacity"
                            label="PEOPLE"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}

                            error={errorCapacity}
                            helperText={textErrorCapacity}
                            sx={{ width: "300px", marginBottom: "10px" }}
                        />
                        <Select
                            id="status"
                            value={statusID}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {statuss.map((sta: any) => (
                                <MenuItem key={sta.id}
                                    value={sta.id} >

                                    {sta.name}
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


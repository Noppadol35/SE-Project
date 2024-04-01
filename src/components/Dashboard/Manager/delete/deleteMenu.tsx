import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button
                onClick={handleOpen}
                startIcon={<CheckBoxIcon />}
                variant="contained"
                className=" bg-green-600 font-bold hover:bg-green-700"
            >
                Confirm
            </Button>
        </React.Fragment>
    );
}

export default function DeleteMenu() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                style={{ minWidth: 5, padding: 3, color: "grey" }}
            >
                <DeleteIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title" className=" font-bold">
                        🗑️ Delete ?
                    </h2>
                    <p id="parent-modal-description" className=" m-3 ">
                        {
                            "👉🏻 Are you sure you want to delete this {menu.name} ?"
                        }
                    </p>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}

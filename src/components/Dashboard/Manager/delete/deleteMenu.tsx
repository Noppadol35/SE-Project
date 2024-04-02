import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
    pt: 2,
    px: 4,
    pb: 3,
};

interface DeleteMenuProps {
    menuData: {
        id: number;
        name: string;
        category: string;
    };
}


export default function DeleteMenu(props  : DeleteMenuProps) {
    const [open, setOpen] = React.useState(false);
    const { menuData } = props;
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.delete(`/api/menu/${menuData.id}`);
            handleClose();
            console.log("Deleted");
        } catch (error) {
            console.error(error);
        }
    }

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
                    <div>
                        <Button
                            onClick={handleSubmit}
                            startIcon={<CheckBoxIcon />}
                            variant="contained"
                            className=" bg-green-600 font-bold hover:bg-green-700"
                        >
                            Confirm
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

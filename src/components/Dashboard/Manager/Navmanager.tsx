"use client";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import HistoryIcon from "@mui/icons-material/History";
import { UserTable } from "@/components/Dashboard/Manager/ManagerTable";
import { Usermenu } from "@/components/Dashboard/Manager/ManageMenu";
import { Userhistory } from "@/components/Dashboard/Manager/ManageHistory";
import { UserData } from "@/components/Dashboard/Manager/ManagerUser";
import LogoutIcon from "@mui/icons-material/Logout";
// import Navbar from "@/components/Dashboard/Chef/components/Navbar";

const drawerWidth = 240;

export default function ClippedDrawer() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [historyOpen, setHistoryOpen] = React.useState(false);
    const [tableOpen, setTableOpen] = React.useState(false);
    const [UserOpen, setUserOpen] = React.useState(true);
    const { data: session, update } = useSession();

    function handleListItemClick(text: string) {
        if (text === "Menu") {
            setMenuOpen(true);
            setHistoryOpen(false);
            setTableOpen(false);
            setUserOpen(false);
        } else if (text === "History") {
            setMenuOpen(false);
            setHistoryOpen(true);
            setTableOpen(false);
            setUserOpen(false);
        } else if (text === "Table") {
            setMenuOpen(false);
            setHistoryOpen(false);
            setTableOpen(true);
            setUserOpen(false);
        } else if (text === "User") {
            setMenuOpen(false);
            setHistoryOpen(false);
            setTableOpen(false);
            setUserOpen(true);
        }
    }

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <AppBar
                    position="fixed"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <Toolbar className=" justify-between bg-green-600">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className=" uppercase font-bold"
                        >
                            Admin Dashboard
                        </Typography>
                        <Button
                            variant="contained"
                            className=" bg-red-600 font-bold hover:bg-red-700"
                            startIcon={<LogoutIcon />}
                            onClick={async () => {
                                await signOut({ callbackUrl: "/" });
                                await update();
                                console.log("sign out!");
                            }}
                        >
                            logout
                        </Button>
                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: "auto" }}>
                        <List>
                            {["User", "Table", "Menu", "History"].map(
                                (text, index) => (
                                    <ListItem
                                        key={text}
                                        disablePadding
                                        onClick={() =>
                                            handleListItemClick(text)
                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemIcon>
                                                {index === 0 ? (
                                                    <PersonIcon />
                                                ) : (
                                                    ""
                                                )}
                                                {index === 1 ? (
                                                    <TableRestaurantIcon />
                                                ) : (
                                                    ""
                                                )}
                                                {index === 2 ? (
                                                    <RestaurantMenuIcon />
                                                ) : (
                                                    ""
                                                )}
                                                {index === 3 ? (
                                                    <HistoryIcon />
                                                ) : (
                                                    ""
                                                )}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            )}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {menuOpen && <Usermenu />}
                    {historyOpen && <Userhistory />}
                    {tableOpen && <UserTable />}
                    {UserOpen && <UserData />}
                </Box>
            </Box>
        </div>
    );
}

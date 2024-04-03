"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import QrCodeIcon from "@mui/icons-material/QrCode";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, AlertTitle } from '@mui/material';


const styling = {
  container: {
    paddingRight: 2,
    paddingBottom: 2,
  },
};

const buttonStyle = {
  bgcolor: "#FF0000",
  border: "1px black solid",
  p: 1,
  "&:hover": {
    bgcolor: "#FBFADA",
  },
};

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

const Edit = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [name, setname] = useState("");
  const [capacity, setCapacity] = useState("");
  const [statusID, setStatusId] = useState("");
  const [statuss, setStatuss] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/`);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatuss = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/statuss/`);
      setStatuss(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPostsTable = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

      setname(res.data.name || "");
      setCapacity(res.data.capacity);
      setStatusId(res.data.statusID || "");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchPostsTable(id);
    fetchStatuss();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setStatusId("2");
      await axios.put(`http://localhost:3000/api/posts/${id}`, {
        capacity,
        statusID: "2",
      });
      router.push("http://localhost:3000/cashierPage");
      window.open(
        `http://localhost:3000/cashierPage/component/receipt/${id}`,
        "_blank"
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setCapacity("0");
      setStatusId("1");

      await axios.put(`http://localhost:3000/api/posts/${id}`, {
        statusID: "1",
        capacity: "0",
      });

      router.push("/cashierPage");
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [showError, setShowError] = React.useState(false);

  const handleClickOpen = () => {
    if (!capacity || isNaN(Number(capacity)) || Number(capacity) <= 0){
      
      setShowError(true);
      
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  //    posts.forEach((table: Table) => {
  //      table.totalPrice = table.priceperperson * table.capacity;
  //  });

  const getTableColor = (status: string) => {
    return status === "EATING" ? "#FF0000" : "#00FF00";
  };

  
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <CssBaseline />

      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={8} md={8}>
          <Box
            height="auto"
            bgcolor={"#FFFFFF"}
            my={0}
            gap={0}
            p={5}
            sx={{ borderTop: "3px solid #12372A" }}
          >
            <Grid
              spacing={5}
              alignItems="center"
              justifyContent="center"
              container
            >
              {posts.map((table: any) => (
                <Grid
                  key={table.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={styling.container}
                  textAlign="center"
                >
                  <Button
                    sx={{
                      ...buttonStyle,
                      bgcolor: "#FFFFFF",
                      border: `1px solid ${getTableColor(table.status.name)}`,
                      boxShadow: "0px 2px 5px 3px rgba(0, 0, 0, 0.38)",
                      p: 2,
                    }}
                    variant="contained"
                    href={`http://localhost:3000/dashboard/cashier/table/${table.id}`}
                  >
                    <Box
                      height={80}
                      width={100}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ border: "0px solid #12372A" }}
                    >
                      <Typography fontSize={20} sx={{ color: "#6D6F6F" }}>
                        {table.name}
                      </Typography>
                      <Typography sx={{ color: "#436850" }}>
                        {table.status.name}
                      </Typography>

                      <TableRestaurantIcon
                        sx={{ fontSize: "large", color: "#6D6F6F" }}
                      />
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          {/* ส่วนแสดงรายละเอียดโต๊ะ */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Box
              bgcolor="#EEEEEE"
              height="70vh"
              my={0}
              display="flex"
              flexDirection="column"
              gap={1}
              p={1}
              sx={{
                border: "3px solid #12372A",
                "@media (max-width: 598px)": {
                  bgcolor: "#EEEEEE",
                  height: "auto",
                  my: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 1,
                },
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h3" component="h2">
                  {name}
                </Typography>
              </Box>

              <TextField
                id="Capacity"
                label="PEOPLE"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
                {showError && (
                  <Alert variant="filled" severity="error" onClose={() => setShowError(false)}>
                    <AlertTitle>Error</AlertTitle>
                    Please enter a valid number for Capacity
                  </Alert>
                )}    
              <RadioGroup
                value={statusID}
                
                onChange={(e) => setStatusId(e.target.value)}
              >
                {statuss.map((sta: any) => (
                  <FormControlLabel
                    value={sta.id}
                    label={sta.name}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </Box>

              

            {/* ส่วนแสดงปุ่ม ปริ้น QR, ปุ่ม Checkout */}

            <div>
              <Box
                bgcolor="#EEEEEE"
                height="auto"
                my="0rem"
                display="flex"
                flexDirection="column"
                gap="1rem"
                p="1rem"
                sx={{ border: "3px solid #12372A", alignItems: "center" }}
              >
                <React.Fragment>
                  <Button
                    sx={{
                      background: "#ADBC9F",
                      border: "1px solid #12372A",
                      p: 3,
                    }}
                    variant="contained"
                    onClick={handleClickOpen}
                    startIcon={
                      <QrCodeIcon sx={{ fontSize: "large", color: "white" }} />
                    }
                  >
                    Print QRCODE
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>CONFIRM PRINT QRCODE ?</DialogTitle>

                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}>CONFIRM</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>

                <React.Fragment>
                  <Button
                    sx={{
                      bgcolor: "#ADBC9F",
                      border: "1px solid #12372A",
                      p: 3,
                    }}
                    variant="contained"
                    onClick={handleClickOpen2}
                    startIcon={
                      <QrCodeIcon sx={{ fontSize: "large", color: "white" }} />
                    }
                  >
                    CHECKOUT
                  </Button>
                  <Dialog open={open2} onClose={handleClose2}>
                    <DialogTitle>CONFIRM CHECKOUT ?</DialogTitle>

                    <DialogActions>
                      <Button autoFocus onClick={handleClose2}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit2}>CONFIRM</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </Box>
            </div>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Edit;

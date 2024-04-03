"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


const NavbarMenu = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [name, setname] = useState("");
  const [capacity, setCapacity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [MenuID, setMenuID] = useState("");
  const [tableID, setTableID] = useState("");

  const fetchPostsTable = async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

      setname(res.data.name || "");
      setCapacity(res.data.capacity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    fetchPostsTable(id);
    
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      
      await axios.put(`http://localhost:3000/api/Cart/`, {
        quantity,
        MenuID,
        tableID,
        
      });
      
      
    } catch (error) {
      console.error(error);
    }
  };
        
    return (
      <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography sx={{ flexGrow : 1 }}>
              
            </Typography>
              <Typography variant="h3" component="h2" sx={{ flexGrow : 1 }}>
                  {name}
              </Typography>
             
              
            <Typography>
            <Tooltip title="Cart" arrow>
              <Link href={`/Cart/${id}`}>
              <IconButton sx={{ color: 'white'}} >

                <ShoppingCartOutlinedIcon />

              </IconButton>
              </Link>
            </Tooltip>
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

    </React.Fragment>
    );
  }

export default NavbarMenu;
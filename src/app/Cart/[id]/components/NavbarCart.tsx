"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


const NavbarCart = ({ params }: { params: { id: string } }) => {
    const { id } = params;
        
      const router = useRouter();
      const [name, setname] = useState("");
      const [capacity, setCapacity] = useState("");
      const [statusId, setStatusId] = useState("");
      const [statuss, setStatuss] = useState([]);
      const [posts, setPosts] = useState([]);

      const fetchPostsTable = async (id: string) => {
        try {
          const res = await axios.get(`http://localhost:3000/api/posts/${id}`);

          setname(res.data.name || "");
          setCapacity(res.data.capacity);
          setStatusId(res.data.statusId || "");
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        
        fetchPostsTable(id);
        
      }, [id]);

    
    return (
      <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>

         
          <Toolbar>
            <Typography sx={{ flexGrow : 1 }}>
            <Link href={`/menu/${id}`}>
              <Tooltip title="back" arrow>
              <IconButton sx={{ color: 'white'}}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              </Tooltip>
            </Link>
            </Typography>
            <Typography variant="h3" component="h2" sx={{ flexGrow : 1 }}>
                  {name}
            </Typography>
           
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

    </React.Fragment>
    );
  }

  export default NavbarCart;
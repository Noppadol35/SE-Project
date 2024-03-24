import * as React from 'react';
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

export default function NavbarMenu() {
    return (
      <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar>

         
          <Toolbar>
            <Typography sx={{ flexGrow : 1 }}>
            <Link href="/menu">
              <Tooltip title="back" arrow>
              <IconButton sx={{ color: 'white'}}>
                <ArrowBackOutlinedIcon />
              </IconButton>
              </Tooltip>
            </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow : 1 }}>
              โต๊ะที่ 199
            </Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />

    </React.Fragment>
    );
  }
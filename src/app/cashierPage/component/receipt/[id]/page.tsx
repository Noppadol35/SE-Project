'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';






const styling = {
  container: {
    paddingRight: 2,
    paddingBottom: 2
  },
};

const buttonStyle = {
  bgcolor: '#FF0000',
  border: '1px black solid',
  p: 1,
  '&:hover': {
    bgcolor: '#FBFADA',
  },
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

const Receipt = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter(); 
  const [name, setname] = useState('');
  const [capacity, setCapacity] = useState('');
  const [statusId, setStatusId] = useState('');
  const [statuss, setStatuss] = useState([]);
  const [posts, setPosts] = useState([]);
  
  



  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts/`)
      setPosts(res.data)
      
    } catch (error) {
      console.error(error)
    }
  }

  const fetchStatuss = async () => {
    try {
      const res = await axios.get(`/api/statuss/`)
      setStatuss(res.data)
      
    } catch (error) {
      console.error(error)
    }
  }


  const fetchPostsTable = async ( id: string) => {
    try {
      const res = await axios.get(`/api/posts/${id}`)
      
      setname(res.data.name || '')
      setCapacity(res.data.capacity)
      setStatusId(res.data.statusId || '')

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts() 
    fetchPostsTable(id)
    fetchStatuss()
    
  }, [id])

  
 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    
    try {
      await axios.put(`/api/posts/${id}`, {
          
          // capacity,
          // statusId,
          
        
      })
      window.close();
     } catch (error) {
       console.error(error)
     }
  }


    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        
        <Grid container sx={{ flexGrow: 1 }}>
      
        
          <Grid item xs={12} sm={12} md={12}>
            {/* ส่วนแสดงรายละเอียดโต๊ะ */}
            <form onSubmit={handleSubmit}  className="space-y-6">  
              <Box
                bgcolor='#EEEEEE'
                height='70vh'
                my={0}
                display="flex"
                flexDirection="column"
                gap={1}
                p={1}
                sx={{
                  border: '3px solid #12372A',
                  '@media (max-width: 598px)': {
                    bgcolor: '#EEEEEE',
                    height: 'auto',
                    my: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: 1
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography  variant="h3" component="h2" >
                      {name}
                    </Typography>
                </Box>
                  
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" component="h2" >
                      Capacity: {capacity}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src="https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://www.youtube.com/watch?v=BxeFmWY8Rps/&chld=L|0" alt="" />
                </Box>
              </Box>
            {/* ส่วนแสดงปุ่ม ปริ้น QR, ปุ่ม Checkout */}
                
              <div>
                <Box
                  bgcolor='#EEEEEE'
                  height='auto'
                  my='0rem'
                  display="flex"
                  flexDirection="column"
                  gap='1rem'
                  p='1rem'

                  sx={{ border: '3px solid #12372A', alignItems: 'center' }}
                >

                <Button  sx={{
                        bgcolor: '#ADBC9F',
                        border: '1px solid #12372A',
                        p: 3,
                      }}
                      variant="contained" 
                      href="JavaScript:window.close()"

                      // onClick={handleClickOpen}
                      
                      // startIcon={<QrCodeIcon sx={{ fontSize: 'large', color: 'white' }} />}
                    >   
                     CLOSE
                </Button>
                    
                </Box>
              </div>
            </form>
          </Grid>
        </Grid>
      </Box>
    );
}

export default Receipt
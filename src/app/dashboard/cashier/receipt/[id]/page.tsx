'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import QRCode from 'qrcode.react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Center } from '@mantine/core';



const Receipt = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter(); 
  const [name, setname] = useState('');
  const [capacity, setCapacity] = useState('');
  const [statusID, setStatusId] = useState('');
  const [statuss, setStatuss] = useState([]);
  const [posts, setPosts] = useState([]);
  const [priceperperson, setPricePerPerson] = useState('');
  const qrCodeURL = `http://localhost:3000/menu/${id}`;
  



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
      setStatusId(res.data.statusID || '')
      setPricePerPerson(res.data.priceperperson || '') 

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchPosts() 
    fetchPostsTable(id)
    fetchStatuss()
    
  }, [id])

  const handleClose = () => {
    window.close();
  }
 

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
      <div className='bg-[#dfdfdf]'>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        
        <Grid container sx={{ flexGrow: 1 }}  justifyContent="center">
      
        
          <Grid item xs={8} sm={8} md={8} >
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
                      จำนวน: {capacity} คน
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <QRCode value={qrCodeURL} />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" component="h1">
                        ทานให้อร่อยนะคะ! ^^
                    </Typography>
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

                <Button className="bg-red-500 hover:bg-green-700 text-white font-bold py-5 px-10 rounded-full"
                      variant="contained" 
                      onClick={handleClose}

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
    </div>
    );
}

export default Receipt
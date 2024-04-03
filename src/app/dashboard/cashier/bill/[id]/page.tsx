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



const Receipt = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter(); 
  const [name, setname] = useState('');
  const [capacity, setCapacity] = useState('');
  const [statusID, setStatusId] = useState('');
  const [statuss, setStatuss] = useState([]);
  const [posts, setPosts] = useState([]);
  const [priceperperson, setPricePerPerson] = useState(''); 
  const [total, setTotal] = useState('');
  const [bill, setBill] = useState('');
   const [people, setPeople] = useState('');




  const fetchBill = async () => {
    try {
      const res = await axios.get(`/api/bill/${id}`);
      setname(res.data.table.name);
      setPeople(res.data.people);
      setTotal(res.data.total);
    } catch (error) {
      console.error(error);
    }
  }

    const fetchPostsTable = async (id: string) => {
        try {
        const res = await axios.get(`/api/posts/${id}`)
        setname(res.data.name || '')
        setCapacity(res.data.capacity)
        setPricePerPerson(res.data.priceperperson || '');
        } catch (error) {
        console.error(error)
        }
    }
  useEffect(() => {
   
    fetchPostsTable(id)
    fetchBill()   
    
  }, [id])

  
  const handleClose = () => {
    window.close();
  }


    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CssBaseline />
        
        <Grid container sx={{ flexGrow: 1 }}>
      
        
          <Grid item xs={12} sm={12} md={12}>
            {/* ส่วนแสดงรายละเอียด*/}
            <form   className="space-y-6">  
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
                }}>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" component="h2">
                  {name}
                </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3" component="h2">
                  <img src="https://promptpay.io/0868681682.png" alt="PromptPay QR Code" />
                </Typography>
                </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" component="h2">
                  จำนวน: {people} คน
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h5" component="h2">
                  ราคารวม: {total} บาท
                </Typography>
              </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" component="h1">
                        ขอบคุณที่มาอุดหนุนนะคะ ^^
                    </Typography>
                </Box>
              </Box>

            {/* ส่วนแสดงปุ่ม CLOSE */}
                
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

                <Button  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'
                      variant="contained" 
                      onClick={handleClose}
   
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
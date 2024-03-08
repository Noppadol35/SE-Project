"use client"
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import Modal from '@mui/material/Modal';

interface Table {
  Table_id: number;
  status: string;
  people: number;
  pricePerPerson: number;
  totalPrice: number;
  orders: Order[];
}

interface Order {
  itemName: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

const tableData: Table[] = [
  { 
    Table_id: 1, 
    status: 'โต๊ะว่าง', 
    people: 0,
    pricePerPerson: 0,
    totalPrice: 0,
    orders: []
  },
  { 
    Table_id: 2, 
    status: 'โต๊ะเต็ม', 
    people: 10, // จำนวนคน
    pricePerPerson: 199, // ราคาคนละ
    totalPrice: 0 ,// รวมทั้งหมด (ให้คำนวณ)
    orders: []
  },
  { 
    Table_id: 3, 
    status: 'โต๊ะว่าง', 
    people: 0,
    pricePerPerson: 0,
    totalPrice: 0,
    orders: []
  },
];

tableData.forEach((table) => {
  table.totalPrice = table.pricePerPerson * table.people;
});

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

const getTableColor = (status: string) => {
  return status === 'โต๊ะเต็ม' ? '#FF0000' : '#00FF00';
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

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedTable, setSelectedTable] = React.useState<Table | null>(null);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ bgcolor: '#12372A', color: '#FBFADA', p:2}}>
            <Typography variant="h3" component="div" textAlign='center'>
              อร่อยบอกต่อ ไม่อร่อยก็กินให้หมด
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={8} md={8} item>
          <Box
            height='auto'
            my={0}
            gap={0}
            p={5}
            sx={{ border: '2px solid grey' }}
          >
            <Grid spacing={2} alignItems='center' container>
              {tableData.map((table) => (
                <Grid key={table.Table_id} item xs={12} sm={6} md={4} sx={styling.container} textAlign='center'>
                <Button
                  sx={{
                    ...buttonStyle,
                    bgcolor: getTableColor(table.status),
                    border: '1px black solid',
                    p: 1
                  }}
                  variant="contained"
                  onClick={() => handleTableClick(table)}
                >
                  <Box sx={{ bgcolor: '#FFFFFF', color: '#4D4D4F', p: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      สถานะโต๊ะ: {table.status}
                    </Typography>
                    <TableRestaurantIcon sx={{ fontSize: '3rem', color: 'black' }} />
                  </Box>  
                </Button>
              </Grid>
              ))}
            </Grid>
          </Box>  
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          {/* ส่วนแสดงรายละเอียดโต๊ะ */}
          <Box
            height='auto'
            my={0}
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            sx={{ border: '2px solid grey' }}
          >
            {selectedTable && (
              <Box>
                <Typography variant="h6" component="div">
                  {`โต๊ะ: Table ${selectedTable.Table_id}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {`สถานะโต๊ะ: ${selectedTable.status}`}
                </Typography>
                {selectedTable.people > 0 && (
                  <>
                    <Typography variant="body1" component="div">
                      {`จำนวนคนที่นั่ง: ${selectedTable.people}`}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {`ราคาคนละ: ${selectedTable.pricePerPerson}`}
                    </Typography>
                    <Typography variant="body1" component="div">
                      {`รวมทั้งหมด: ${selectedTable.totalPrice}`}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </Box>
           {/* ส่วนแสดงปุ่ม ปริ้น QR, ปุ่ม Checkout */}         
          <Box
            height='auto'
            my={0}
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            sx={{ border: '2px solid grey' }}
            alignItems='center'
          >
            <div>
              <Button sx={ {
                      ...buttonStyle,
                      bgcolor: '#ADBC9F',
                      border: '1px black solid',
                      p: 1
                    }}
                    variant="contained"
               onClick={handleOpen}>Print QRCODE</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
            
            <div>
              <Button sx={ {
                      ...buttonStyle,
                      bgcolor: '#ADBC9F',
                      border: '1px black solid',
                      p: 1
                    }}
                    variant="contained"
               onClick={handleOpen}>Checkout</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

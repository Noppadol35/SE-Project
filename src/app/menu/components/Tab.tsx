import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import QuantityControl from "./QuantityControl";
import { makeStyles } from '@mui/styles';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";

const useStyles = makeStyles({
  tableContainer: {
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #dddddd',
  },
  tableHeadCell: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    borderBottom: '1px solid #dddddd',
  },
});

interface MenuItems {
  id: string;
  name: string;
  price: number;
}


const StickyHeadTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100); // Set default rows per page
  const classes = useStyles();
  const [menu, setMenu] = useState<MenuItems[]>([]);

  useEffect(() => {
    getMenu();
  }, []);

  async function getMenu() {
    try {
      const response = await axios.get("http://localhost:3000/api/menu");
      setMenu(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleIncrement = (index: number) => {
  //   setMenu((prevRows) => {
  //     const newRows = [...prevRows];
  //     newRows[index].food_amount = Math.max(0, newRows[index].food_amount + 0.5);
  //     return newRows;
  //   });
  // };

  // const handleDecrement = (index: number) => {
  //   setRows((prevRows) => {
  //     const newRows = [...prevRows];
  //     newRows[index].food_amount = Math.max(0, newRows[index].food_amount - 0.5);
  //     return newRows;
  //   });
  // };

  return (
    <div>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>No.</TableCell>
              <TableCell className={classes.tableHeadCell}>Name</TableCell>
              <TableCell className={classes.tableHeadCell}>Price</TableCell>
              <TableCell className={classes.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.tableCell}>{index + 1}</TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="body1">{row.name}</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>{row.price} บาท</TableCell>
                  {/* <TableCell className={classes.tableCell}>
                    <QuantityControl
                      count={row.food_amount}
                      handleIncrement={() => handleIncrement(page * rowsPerPage + index)}
                      handleDecrement={() => handleDecrement(page * rowsPerPage + index)}
                    />
                  </TableCell> */}
                  <TableCell className={classes.tableCell}>
                    {/* <Button
                      className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900=">
                      ADD
                    </Button> เผื่ออยากกลับมาใช้ปุ่ม */}
                  <Tooltip title="Add to cart" arrow>
                    <IconButton>
                      <AddShoppingCartOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StickyHeadTable;

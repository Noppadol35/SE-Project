import React, { useEffect, useState } from "react";
import styled from 'styled-components'; // import styled-components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";

interface MenuItems {
  id: string;
  name: string;
  price: number;
}

const StyledTableCell = styled(TableCell)`
  /* Add your styles here if needed */
`;

const StickyHeadTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100); // Set default rows per page
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

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={row.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body1">{row.name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>{row.price} บาท</StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="Add to cart" arrow>
                      <IconButton>
                        <AddShoppingCartOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StickyHeadTable;

"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

interface Table {
  Table_id: number;
  status: string;
}

const tableData: Table[] = [
  { Table_id: 1, status: "โต๊ะว่าง" },
  { Table_id: 2, status: "โต๊ะเต็ม" },
  { Table_id: 3, status: "โต๊ะว่าง" },
  { Table_id: 4, status: "โต๊ะเต็ม" },
  { Table_id: 5, status: "โต๊ะเต็ม" },
  { Table_id: 6, status: "โต๊ะเต็ม" },
  { Table_id: 7, status: "โต๊ะว่าง" },
  { Table_id: 8, status: "โต๊ะว่าง" },
  { Table_id: 9, status: "โต๊ะเต็ม" },
];

const styling = {
  container: {
    paddingRight: 2,
    paddingBottom: 2,
  },
};

const getTableColor = (status: string) => {
  return status === "โต๊ะเต็ม" ? "#FF0000" : "#008000";
};

export default function Page() {
  const [selectedTable, setSelectedTable] = React.useState<Table | null>(null);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ bgcolor: "#4D4D4F", color: "#FF0000", p: 2 }}>
            <Typography variant="h3" component="div" textAlign="center">
              อร่อยบอกต่อ ไม่อร่อยก็กินให้หมด
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} sm={8} md={8} item>
          <Box
            height="auto"
            my={0}
            gap={0}
            p={5}
            sx={{ border: "2px solid grey" }}
          >
            <Grid spacing={2} alignItems="center" container>
              {tableData.map((table) => (
                <Grid
                  key={table.Table_id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  sx={styling.container}
                  textAlign="center"
                >
                  <Button
                    sx={{
                      bgcolor: getTableColor(table.status),
                      border: "1px black solid",
                      p: 1,
                    }}
                    variant="contained"
                    onClick={() => handleTableClick(table)}
                  >
                    <Box sx={{ bgcolor: "#4D4D4F", color: "#4D4D4F", p: 1 }}>
                      <TableRestaurantIcon
                        sx={{ fontSize: "3rem", color: "white" }}
                      />
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid xs={12} sm={4} md={4} item>
          <Box
            height="auto"
            my={0}
            display="flex"
            flexDirection="column"
            gap={1}
            p={1}
            sx={{ border: "2px solid grey" }}
          >
            {selectedTable && (
              <>
                <Typography variant="h6" component="div">
                  {`โต๊ะ: Table ${selectedTable.Table_id}`}
                </Typography>
                <Typography variant="body1" component="div">
                  {`สถานะโต๊ะ: ${selectedTable.status}`}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

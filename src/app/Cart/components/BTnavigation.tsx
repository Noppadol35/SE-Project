import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Stack from "@mui/material/Stack";
import WidgetsIcon from '@mui/icons-material/Widgets';
import HistoryIcon from '@mui/icons-material/History';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: "space-between" }}>
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#ff7961",
      }}
      value={value}
      onChange={handleChange}
      >
          <BottomNavigationAction
            label="Menu"
            value="menu"
            icon={<WidgetsIcon sx={{ color: "black" }} />}
            style={{ color: "black" }} // เปลี่ยนสีของตัวอักษรเป็นสีดำ
          />

          
          <BottomNavigationAction
            label="History"
            value="history"
            icon={<HistoryIcon sx={{ color: "black" }} />}
            style={{ color: "black" }} // เปลี่ยนสีของตัวอักษรเป็นสีดำ
          />
    </BottomNavigation>
    </Stack>
  );
}

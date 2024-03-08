import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // ค่า zIndex ที่มากกว่าค่า zIndex ขององค์ประกอบอื่นในหน้าเว็บ
        backgroundColor: "#ff7961",
      }}
      value={value}
      onChange={handleChange}
    >
      <Stack direction="row" justifyContent="space-between" width="100%">
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon sx={{ color: "black" }} />}
          style={{ color: "black" }}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon sx={{ color: "black" }} />}
          style={{ color: "black" }}
        />
      </Stack>
    </BottomNavigation>
  );
}

import React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface QuantityControlProps {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ count, handleIncrement, handleDecrement }) => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      <Typography variant="h6">จำนวน: {count}</Typography>
      <IconButton onClick={handleDecrement} aria-label="decrement">
        <RemoveIcon />
      </IconButton>
      <IconButton onClick={handleIncrement} aria-label="increment">
        <AddIcon />
      </IconButton>
    </div>
  );
}

export default QuantityControl;

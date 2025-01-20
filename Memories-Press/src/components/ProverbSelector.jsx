import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ProverbSelector = ({ proverbs, currentProverbIndex, setCurrentProverbIndex }) => {
  const handleChange = (event) => {
    const selectedIndex = event.target.value;
    setCurrentProverbIndex(selectedIndex);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="proverb-select-label">Select a Proverb</InputLabel>
      <Select
        labelId="proverb-select-label"
        id="proverb-select"
        value={currentProverbIndex}
        label="Select a Proverb"
        onChange={handleChange}
      >
        {proverbs.map((proverb, index) => (
          <MenuItem key={index} value={index}>
            {proverb}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProverbSelector;
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import PrayerCard from './PrayerCard'

function CartItem() {
  const [design, setDesign] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const handleDesign = (event) => {
    setDesign(event.target.value);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const designSelect = (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="design-select-label">design</InputLabel>
      <Select
        labelId="design-select-label"
        id="design-select-small"
        value={design}
        label="design"
        onChange={handleDesign}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"template1"}>template1</MenuItem>
        <MenuItem value={"template2"}>template2</MenuItem>
        <MenuItem value={"template3"}>template3</MenuItem>
      </Select>
    </FormControl>
  )

  const quantitySelect = (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="quantity-select-label">Age</InputLabel>
      <Select
        labelId="quantity-select-label"
        id="quantity-select"
        value={quantity}
        label="quantity"
        onChange={handleQuantity}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  )

  return (
    <Box>
      <Stack direction="row">
        <PrayerCard listDisplay={"true"}/>
        <Stack>
          <Typography>Prayer Cards</Typography>
          <Typography>Proverb</Typography>
          <Stack direction="row">
            <Typography>Design:</Typography>
            {designSelect}
          </Stack>
          <Stack direction="row">
            <Typography>Quantity:</Typography>
            {quantitySelect}
          </Stack>
          <Stack direction="row">
            <Button>Edit</Button>
            <Button>Remove</Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CartItem;
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import PrayerCard from './PrayerCard'

function CartItem() {
  return (
    <Box>
      <Stack direction="row">
        <PrayerCard listDisplay={"true"}/>
        <Stack>
          <Typography>Prayer Cards</Typography>
          <Typography>Proverb</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CartItem;
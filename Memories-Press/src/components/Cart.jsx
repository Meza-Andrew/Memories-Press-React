import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CartItem from './CartItem';

function Cart() {
  return (
    <Container>
      <Box>
        <Typography variant='h3'>
        Your cart is empty.
        </Typography>
        <Typography>
        Creating a personalized piece of funeral stationery can be a beautiful way to honor your loved one's memory. Start designing now to create something truly special and heartfelt. We're here to guide you every step of the way.
        </Typography>
        <CartItem/>
      </Box>
    </Container>
  )
}

export default Cart;
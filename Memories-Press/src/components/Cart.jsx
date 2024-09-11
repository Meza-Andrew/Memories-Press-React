import React, { useContext } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Tooltip, Stack } from '@mui/material';
import CartContext from './CartContext';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{marginTop: 6}}>
      {cartItems.map((item, index) => (
        <Card key={index} sx={{ display: 'flex', mb: 2, maxWidth: "70%", width: "90%", maxWidth: "600px", padding: 1 }}>
          <CardMedia component="img" image={item.smallScaleImage} alt="Small scale" sx={{ width: 150 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
            <CardContent>
              <Stack gap={1}>
              <Typography variant="h6">{item.name}</Typography>
              <Typography variant="body2" color="text.secondary">{item.dob} - {item.dod}</Typography>
              <Typography variant="body2" color="text.secondary">{item.currentProverb}</Typography>
              </Stack>
            </CardContent>
            <Box>
              <Button variant="outlined" color="error" onClick={() => removeFromCart(index)}>Remove</Button>
            </Box>
          </Box>
        </Card>
      ))}
      <Box mt={4}>
        <Tooltip title="Checkout">
          <Button component={RouterLink} variant='contained' color='primary' to="/checkout">
            <Typography>Checkout</Typography>
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Cart;

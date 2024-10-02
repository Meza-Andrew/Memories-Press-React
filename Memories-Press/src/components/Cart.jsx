import React, { useContext } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Tooltip, Stack, Grid } from '@mui/material';
import CartContext from './CartContext';
import { useMedia } from 'react-use';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const isMobile = useMedia('(max-width: 600px)');
  const navigate = useNavigate();

  const handleEdit = (index) => {
    const selectedItem = cartItems[index];
    navigate('/funeralstationary/prayercardeditor', { state: { item: selectedItem, index } });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginTop: 6 }}>
      {cartItems.map((item, index) => (
        <Card key={index} sx={{ display: 'flex', mb: 2, width: "96%", maxWidth: "600px", padding: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={5} sm={4} margin='auto'>
              <CardMedia
                component="img"
                image={item.smallScaleImage}
                alt="Small scale"
                sx={{ width: '100%', border: '2px solid #e8e8e8' }}
              />
            </Grid>
            <Grid item xs={7} sm={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, height: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack gap={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '.6rem', sm: '1rem' } }}>
                      {item.dob} - {item.dod}
                    </Typography>
                    {isMobile ? (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '.8rem', sm: '1rem' } }}>
                        {item.currentProverb.length > 80
                          ? `${item.currentProverb.substring(0, item.currentProverb.substring(0, 80).lastIndexOf(' '))}...`
                          : item.currentProverb}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {item.currentProverb}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button variant="outlined" color="error" sx={{
                    borderRadius: .1
                  }} onClick={() => removeFromCart(index)}>Remove</Button>
                  <Button variant="outlined" sx={{ borderRadius: .1, marginLeft: 1 }} onClick={() => handleEdit(index)}>Edit</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      ))}
      <Box mt={2} mb={6}>
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

import React, { useContext } from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Stack,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import CartContext from './CartContext';
import { useMedia } from 'react-use';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const productEditorRoutes = {
  prayer_card: '/prayercards/producteditor',
  bookmark: '/bookmarks/producteditor',
  memorial_heart: '/memorialhearts/producteditor',
};

function getProverbText(currentProverb) {
  if (!currentProverb) return '';
  if (typeof currentProverb === 'object' && currentProverb.text) {
    return currentProverb.text;
  }
  if (typeof currentProverb === 'string') {
    return currentProverb;
  }
  return '';
}

function Cart() {
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  const isMobile = useMedia('(max-width: 600px)');
  const navigate = useNavigate();

  const handleEdit = (index) => {
    const selectedItem = cartItems[index];
    const type = selectedItem.productType;
    const editRoute = productEditorRoutes[type];
    console.log(`Editing item of type: ${type}`);
    navigate(editRoute, {
      state: { item: selectedItem, index },
    });
  };

  const handleQuantityEdit = (event, index) => {
    updateCartItem(index, { quantity: event.target.value });
  };

  const handleFinishEdit = (event, index) => {
    updateCartItem(index, { finish: event.target.value });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ marginTop: 6, paddingX: { xs: 2, md: 4 } }}
    >
      {cartItems.map((item, index) => {
        const displayedProverb = getProverbText(item.currentProverb);

        const truncatedMobile = displayedProverb.length > 80
          ? displayedProverb.substring(0, displayedProverb.substring(0, 80).lastIndexOf(' ')) + '...'
          : displayedProverb;

        const truncatedDesktop = displayedProverb.length > 100
          ? displayedProverb.substring(0, displayedProverb.substring(0, 100).lastIndexOf(' ')) + '...'
          : displayedProverb;

        return (
          <Card
            key={index}
            sx={{ display: 'flex', mb: 2, width: '100%', maxWidth: '660px', padding: 0.5 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '100%',
                    border: '2px solid #e8e8e8',
                    borderRadius: 0,
                    overflow: 'hidden',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Box
                    component="img"
                    src={item.smallScaleImage}
                    alt={`${item.name} preview`}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={8} md={8}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: 2,
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Stack gap={1}>
                      <Typography variant="h6">{item.name} {item.lastName}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.6rem', sm: '0.8rem' }, fontStyle: 'italic' }}
                      >
                        {item.dob} - {item.dod}
                      </Typography>
                      {isMobile ? (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.7rem', sm: '1rem' } }}
                        >
                          {truncatedMobile}
                        </Typography>
                      ) : (
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.7rem', sm: '0.9rem' } }}>
                          {truncatedDesktop}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          marginTop: 2,
                          flexWrap: 'wrap',
                        }}
                      >
                        <Box sx={{ minWidth: 80, flex: '1 1 80px' }}>
                          <FormControl fullWidth>
                            <InputLabel id={`quantity-select-label-${index}`}>Quantity</InputLabel>
                            <Select
                              labelId={`quantity-select-label-${index}`}
                              id={`quantity-select-${index}`}
                              value={item.quantity}
                              label="Quantity"
                              onChange={(e) => handleQuantityEdit(e, index)}
                              sx={{ height: 40 }}
                            >
                              <MenuItem value={25}>25</MenuItem>
                              <MenuItem value={50}>50</MenuItem>
                              <MenuItem value={75}>75</MenuItem>
                              <MenuItem value={100}>100</MenuItem>
                              <MenuItem value={125}>125</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 80, flex: '1 1 80px' }}>
                          <FormControl fullWidth>
                            <InputLabel id={`finish-select-label-${index}`}>Finish</InputLabel>
                            <Select
                              labelId={`finish-select-label-${index}`}
                              id={`finish-select-${index}`}
                              value={item.finish}
                              label="Finish"
                              onChange={(e) => handleFinishEdit(e, index)}
                              sx={{ height: 40 }}
                            >
                              <MenuItem value="Matte">Matte</MenuItem>
                              <MenuItem value="Gloss">Gloss</MenuItem>
                              <MenuItem value="Soft">Soft</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    </Stack>
                  </CardContent>
                  <Box sx={{ textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ borderRadius: 0.5, minWidth: '75px' }}
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ borderRadius: 0.5, marginLeft: 1, minWidth: '75px' }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>
        );
      })}
      <Box mt={2} mb={6}>
        <Tooltip title="Proceed to Checkout">
          <Button
            component={RouterLink}
            variant="contained"
            color="primary"
            to="/checkout"
          >
            <Typography>Checkout</Typography>
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default Cart;
import * as React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CartContext from './CartContext';

function Info({ totalPrice }) {
  const { cartItems } = useContext(CartContext);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      <List disablePadding>
        {cartItems.map((item, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={item.name}
              secondary={`${item.dob} - ${item.dod}`}
            />
            <img src={item.smallScaleImage} alt={item.name} style={{ width: 'auto', height: 75, marginRight: 16 }} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;

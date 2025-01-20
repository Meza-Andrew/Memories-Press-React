import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Container } from '@mui/material';

function CustomizableSpecs({
  title,
  description,
  finishes,
}) {
  return (
    <Box
      sx={{
        backgroundColor: '#fdf5f8',
        padding: 4,
        borderRadius: 0,
        width: 'auto',
        boxShadow: 'inset 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container disableGutters sx={{
        p: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Box sx={{
          justifyContent: 'left',
          width: {xs: '100%', md: '60%'}
        }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#653948',
          marginBottom: 2,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#4a4a4a',
          marginBottom: 3,
          lineHeight: 1.6,
        }}
      >
        {description}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#4A8540',
          marginBottom: 2,
        }}
      >
        Available finishes
      </Typography>
      <List>
        {finishes.map((finish, index) => (
          <ListItem
            key={index}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              • {finish.name}
            </Typography>
            <ListItemText
              primary={finish.description}
              sx={{
                color: '#4a4a4a',
                marginLeft: 2,
                lineHeight: 1.4,
              }}
            />
          </ListItem>
        ))}
      </List>
      </Box>
      </Container>
    </Box>
  );
}

export default CustomizableSpecs;
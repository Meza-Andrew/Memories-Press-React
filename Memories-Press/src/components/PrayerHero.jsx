import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

const PrayerHero = () => {
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '10vh',
        padding: '10px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        Lorem Ipsum Dolor Sit Amet
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
          color: '#555',
        }}
      >
        Consectetur adipiscing elit, sed do eiusmod tempor incididunt.
      </Typography>
      
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Divider sx={{
        marginBottom: 6,
        width: '60%'
      }}/>
    </Box>
    </>
  );
};

export default PrayerHero;

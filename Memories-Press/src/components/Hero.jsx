import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from './StyledButton';

function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '400px', md: '600px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src="./memories_press-homepage_hero.png"
        alt="Flower"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: { xs: 'center', md: 'left' },
          padding: { xs: 2, md: 4 },
          maxWidth: { xs: '90%', md: '60%' },
          color: 'maroon',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 600,
            marginBottom: 2,
            fontSize: { xs: '2.8rem', md: '3.5rem' },
          }}
        >
          Celebrate life.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '2rem', md: '2.2rem' },
            marginBottom: 3,
            lineHeight: 1.6,
          }}
        >
          Create funeral stationery that honors your loved one’s unique journey.
        </Typography>
        <StyledButton >
          Commemorate your loved one
        </StyledButton>
      </Box>
    </Box>
  );
}

export default Hero;

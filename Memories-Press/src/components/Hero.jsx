import React from 'react';
import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';

function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        textAlign: isMobile ? 'center' : 'left', 
        gap: 0,
      }}
    >
      <Box 
        sx={{ 
          flex: 1, 
          order: isMobile ? 2 : 1,
          // p: isMobile ? 2 : 4 
        }}
      >
        <Typography 
          variant={isMobile ? 'h4' : 'h2'}
          component="h1" 
          // gutterBottom
        >
          Celebrate life with custom funeral stationery
        </Typography>
        <Typography 
          variant={isMobile ? 'h6' : 'h5'}
          component="h2" 
          // gutterBottom
        >
          Create lasting memories that honor your loved one’s unique journey.
        </Typography>
      </Box>
      <Box 
        sx={{
          flex: 1, 
          order: isMobile ? 1 : 2, 
          display: 'flex', 
          justifyContent: isMobile ? 'center' : 'flex-end',
          // mt: isMobile ? 2 : 0 
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: 'auto',
            maxWidth: 400,
          }}
          alt="Flowers"
          src="https://via.placeholder.com/400"
        />
      </Box>
    </Container>
  )
}

export default Hero
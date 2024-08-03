import React from 'react';
import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';

function Hero({heading, subHeading, heroImage}) {
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
        marginBottom: isMobile ? -25 : -20,
        marginTop: isMobile ? 10 : -25
      }}
    >
      <Box 
        sx={{ 
          flex: 1, 
          order: isMobile ? 2 : 1,
          marginTop: isMobile ? 0 : 0,
          marginLeft: isMobile ? 0 : 0
          // p: isMobile ? 2 : 4 
        }}
      >
        <Typography 
          variant={isMobile ? 'h4' : 'h2'}
          component="h1" 
          // gutterBottom
        >
          {heading}
        </Typography>
        <Typography 
          variant={isMobile ? 'h6' : 'h5'}
          component="h2" 
          // gutterBottom
        >
          {subHeading}
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
          src={heroImage}
        />
      </Box>
    </Container>
  )
}

export default Hero
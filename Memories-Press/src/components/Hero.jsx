import React from 'react';
import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import stockheroimage from '../assets/stockheroimage.png';

function Hero({ heading, subHeading, heroImage = stockheroimage }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        position: 'relative',
        height: { xs: 'auto', sm: '600px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 0,
        marginTop: { xs: '10px', sm: '0px' },
        marginBottom: { xs: '0px', sm: '30px', md: '35px', lg: '10px' }
      }}
    >
      <Box
        component="img"
        src={stockheroimage}
        alt="Flowers"
        sx={{
          width: '100%',
          height: { xs: '300px', sm: '100%' },
          objectFit: 'cover',
          zIndex: -1,
          display: { xs: 'block', sm: 'none' }
        }}
      />
      <Box
        component="img"
        src={stockheroimage}
        alt="Flowers"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          display: { xs: 'none', sm: 'block' },
          maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: isMobile ? 2 : 4,
          textAlign: isMobile ? 'center' : 'left',
          color: 'white',
          width: { xs: '100%', sm: '80%', md: '50%', lg: '40%' },
          marginTop: isMobile ? 0 : -5
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          sx={{ fontWeight: '700' }}
          component="h1"
          color='primary'
        >
          {heading}
        </Typography>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{ fontWeight: '400' }}
          component="h2"
          color='#653948'
        >
          {subHeading}
        </Typography>
      </Box>
    </Container>
  );
}

export default Hero;

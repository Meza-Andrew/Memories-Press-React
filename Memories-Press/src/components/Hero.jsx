import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import StyledButton from './StyledButton';

function Hero() {
  const handleScroll = () => {
    const element = document.getElementById('funeral_Stationary');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
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
        backgroundColor: '#000',
      }}
    >
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
          zIndex: 0,
          filter: 'brightness(102%) blur(0px)'
        }}
      >
        <source src="./videos/background_flowers.webm" type="video/webm" />
        Your browser does not support the video tag.
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: { xs: 2, md: 4 },
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#FFFFFF',
          }}
        >
          Celebrate Life.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            marginBottom: 3,
            lineHeight: 1.6,
            color: '#F0F0F0',
            maxWidth: { xs: '100%', md: '60%' },
          }}
        >
          Create funeral stationery that honors your loved one’s unique journey.
        </Typography>
        <StyledButton
          backgroundColor="#D3648B"
          color="#FCF46D"
          onClick={handleScroll}
          width="auto"
          longButton={false} 
        >
          Commemorate Your Loved One
        </StyledButton>
      </Container>
    </Box>
  );
}

export default Hero;
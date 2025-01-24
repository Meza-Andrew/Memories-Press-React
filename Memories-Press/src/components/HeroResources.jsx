import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function HeroResources() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '400px', md: '500px' },
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
            filter: 'brightness(100%) blur(1px)',
          }}
        >
          <source src="./videos/hero_resources.webm" type="video/webm" />
          Your browser does not support the video tag.
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 1,
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            padding: { xs: 2, md: 4 },
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'center' },
            textAlign: { xs: 'center', md: 'center' },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              marginBottom: 2,
              fontSize: { xs: '2rem', md: '3rem' },
              color: '#D3648B',
            }}
          >
            Stafford, VA <br /> Funeral planning resources
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.2rem', md: '2.2rem' },
              marginBottom: 3,
              lineHeight: 1.6,
              fontWeight: 600,
              color: '#653948',
              maxWidth: { xs: '100%', md: '70%' },
            }}
          >
            Find trusted funeral homes and florists in Stafford with Memories Press
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: '#FFF5F9',
          height: '35px',
          width: '100%',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
        }}
      />
    </>
  );
}

export default HeroResources;
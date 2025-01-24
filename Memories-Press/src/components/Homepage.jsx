import React from 'react';
import { Box, Container } from '@mui/material';
import Hero from './Hero';
import CTA from './CTA';
import CTA_Partner from './CTA_Partner'
import ProductsList from './ProductsList';
import ReviewCardList from './ReviewCardList';
import ResourcesList from './ResourcesList';

function Homepage() {

  return (
    <>
      <Hero />
      <Box
        sx={{
          backgroundColor: '#FFF5F9',
          height: '35px',
          width: '100%',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
        }}
      />
      <Container
        id="funeral_Stationary"
        maxWidth="xl"
        disableGutters
        sx={{
          paddingY: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <ProductsList />
        <Box
        component="img"
        src="./carnations.png"
        alt="Decorative Flower"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          zIndex: -1,
          opacity: 1,
          display: { xs: 'none', md: 'block' },
        }}
      />
      </Container>
      <Box
        sx={{
          marginTop: 0,
          width: '100%',
        }}
      >
        <ReviewCardList showBackground={true} />
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          paddingY: 2,
          display: 'flex',
          justifyContent: 'right',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <ResourcesList />
        <Box
        component="img"
        src="./carnations.png"
        alt="Decorative Flower"
        sx={{
          position: 'absolute',
          top: 0,
          left: 50,
          bottom: 0,
          height: '120%',
          transform: 'scale(-1, 1)',
          zIndex: -1,
          opacity: 1,
          display: { xs: 'none', md: 'block' },
        }}
      />
      </Container>
      <Container
        maxWidth="100%"
        disableGutters
        sx={{
          paddingTop: 0,
        }}
      >
        <CTA />
      </Container>
      <Container
        maxWidth="md"
        disableGutters
        sx={{
          paddingY: 12,
          paddingX: 4
        }}
      >
        <CTA_Partner />
      </Container>
    </>
  );
}

export default Homepage;
import React from 'react';
import { useTheme, Box } from '@mui/material';
import Hero from './Hero';
import CTA from './CTA';
import ProductsList from './ProductsList';
import ReviewCardList from './ReviewCardList';
import ResourcesList from './ResoucesList';


function Homepage() {
  const theme = useTheme();
  return (
    <>
      <Hero/>
      <Box
        sx={{
          backgroundColor: '#ffe4e1',
          height: '35px',
          width: '100%',
          boxShadow: theme.shadows[1],
        }}
      />
      <ProductsList/>
      <ReviewCardList/>
      <ResourcesList/>
      <CTA/>
    </>
  );
}

export default Homepage;

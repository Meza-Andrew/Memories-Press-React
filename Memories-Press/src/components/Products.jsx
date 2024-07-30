import React from 'react'
import Hero from './Hero';
import PrayerCard from './PrayerCard';
import { Stack, Typography, Box } from '@mui/material';

function Products() {
  const products = ['Prayer cards'];
  const templates = [1, 2, 5];
  const heading = "Custom funeral stationery by Memories Press";
  const subHeading = "Create personalized tributes with our comprehensive stationery options.";
  const heroImage = "https://via.placeholder.com/400";
  return (
    <>
      <Hero heading={heading} subHeading={subHeading} heroImage={heroImage} />
      {products.map((product) => (
        <Box key={product}>
          <Typography>{product}</Typography>
          <Stack direction="row">
            {templates.map((template) => (
              <PrayerCard key={template} listDisplay={true}/>
            ))}
          </Stack>
        </Box>
      ))}
    </>
  );
}

export default Products;
//redo this, just display funeral cars and view more.
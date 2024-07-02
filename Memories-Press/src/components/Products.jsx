import React from 'react'
import Hero from './Hero';
import PrayerCard from './PrayerCard';
import { Typography } from '@mui/material';

function Products() {
  const products = ['Funeral prayer cards', 'Funeral picture boards', 'Funeral bookmarks', 'Memorial hearts'];
  const templates = [1, 2];
  const heading = "Custom funeral stationery by Memories Press";
  const subHeading = "Create personalized tributes with our comprehensive stationery options.";
  const heroImage = "https://via.placeholder.com/400";
  return (
    <>
      <Hero heading={heading} subHeading={subHeading} heroImage={heroImage} />
      {products.map((product) => (
        <div key={product}>
          <Typography>{product}</Typography>
          {templates.map((template) => (
            <PrayerCard key={template} />
          ))}
        </div>
      ))}
    </>
  );
}

export default Products;
//redo this, just display funeral cars and view more.
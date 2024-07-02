import React from 'react';
import { Container, Button, useTheme, useMediaQuery, Box } from '@mui/material';
import Hero from './Hero';
import PrayerCard from './PrayerCard';

function Homepage({isLoggedIn}) {
  const products = ['Funeral prayer cards', 'Funeral picture boards', 'Funeral bookmarks', 'Memorial hearts'];
  const heading = "Celebrate life with custom funeral stationery";
  const subHeading = "Create lasting memories that honor your loved one’s unique journey.";
  const heroImage = "https://via.placeholder.com/400";

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  return (
    <>
      <Hero heading={heading} subHeading={subHeading} heroImage={heroImage}/>
      <Box sx={{
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
      }}>
        {products.map((product) => (
          <PrayerCard
            key={product}
            title={product}
            listDisplay={"false"}
          />
        ))}
      </Box>
      <Container
        disableGutters
        sx={{
          position: "fixed",
          bottom: "0",
          display: { xs: 'flex', md: 'none' }
        }}
      >
        {isLoggedIn === "false" && <Button variant='outlined' color="primary">Login/SignUp</Button>}
        <Button variant='outlined' color="secondary">Start your order</Button>
      </Container>
    </>
  );
}

export default Homepage;



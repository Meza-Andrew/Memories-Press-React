import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Container, Button, useTheme, useMediaQuery, Box } from '@mui/material';
import Hero from './Hero';
import PrayerCard from './PrayerCard';
import FuneralStationary from './FuneralStationary';

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
      <FuneralStationary />
      {isMobile && (
        <Container
          disableGutters
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
            boxShadow: theme.shadows[3],
            zIndex: theme.zIndex.appBar,
            gap: 2
          }}
        >
          {/* {!isLoggedIn && <Button variant='contained' color="primary">SignUp</Button>} */}
          <Button 
            component={RouterLink}
            to='funeralstationary'
            variant='contained' 
            color="secondary" 
            size='large'>Start your order</Button>
        </Container>
      )}
    </>
  );
}

export default Homepage;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import funeralBookmarkExample from '../assets/funeralBookmarkExample.png';
import memorialHeartExample from '../assets/memorialHeartExample.png';
import prayerCardExample from '../assets/prayerCardExample.png';
import funeralPictureBoardExample from '../assets/funeralPictureBoardExample.png';

function FuneralStationary() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const desktopImageVerticalShift = '-105px'; // shift desktop image up or down

  const products = [
    { src: prayerCardExample, alt: 'Funeral Prayer Cards', label: 'Funeral Prayer Cards', navigation: '/funeralstationary/prayercardeditor' },
    { src: funeralPictureBoardExample, alt: 'Funeral Picture Board', label: 'Funeral Picture Board' },
    { src: funeralBookmarkExample, alt: 'Funeral Bookmarks', label: 'Funeral Bookmarks' },
    { src: memorialHeartExample, alt: 'Memorial Hearts', label: 'Memorial Hearts' },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={isDesktop ? 6 : 2} padding={isDesktop ? 4 : 2} justifyContent="center">
        {products.map((product, index) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
            <Box
              component={RouterLink}
              to={product.navigation}
              sx={{
                backgroundColor: '#f8e1e1',
                borderRadius: 6,
                textAlign: 'center',
                position: 'relative',
                overflow: 'visible',
                width: { lg: "290px" , xl: '360px'},
                height: { lg: '355px', xl: '400px' },
                marginBottom: isDesktop ? '120px' : { xs: '10px', sm: '10px', md: '20px' },
                padding: isDesktop ? '10px' : { xs: '10px', sm: '10px', md: '20px' },
                display: 'flex',
                flexDirection: isDesktop ? 'column' : 'row',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f1c1c1',
                },
                '&:hover img': {
                  transform: isDesktop ? 'scale(1.05)' : 'scale(1.0)',
                },
              }}
            >
              <Box
                component="img"
                src={product.src}
                alt={product.alt}
                sx={{
                  
                  maxWidth: isDesktop ? '100%' : '120px',
                  maxHeight: isDesktop ? '320px' : '150px',
                  position: isDesktop ? 'relative' : 'relative',
                  top: isDesktop ? desktopImageVerticalShift : { xs: '0px', sm: '-20px' },
                  left: { xs: '20px', sm: '0px' },
                  marginRight: isDesktop ? '0' : '10px',
                  transition: 'transform 0.3s ease',
                }}
              />
              {/* <Typography variant="h5" mt={isDesktop ? 0 : 1} marginLeft={isDesktop ? 2 : 2}>
                {product.label}
              </Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FuneralStationary;

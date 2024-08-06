import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box, Grid } from '@mui/material';
import funeralBookmarkExample from '../assets/funeralBookmarkExample.png';
import memorialHeartExample from '../assets/memorialHeartExample.png';
import prayerCardExample from '../assets/prayerCardExample.png';
import funeralPictureBoardExample from '../assets/funeralPictureBoardExample.png';

export default function FuneralStationaryMUI() {

  const products = [
    { src: prayerCardExample, alt: 'Funeral Prayer Cards', label: 'Prayer Cards', navigation: '/funeralstationary/prayercardeditor' },
    { src: funeralPictureBoardExample, alt: 'Funeral Picture Boards', label: 'Picture Boards' },
    { src: funeralBookmarkExample, alt: 'Funeral Bookmarks', label: 'Bookmarks' },
    { src: memorialHeartExample, alt: 'Memorial Hearts', label: 'Memorial Hearts' },
  ];

  return (
    <Grid container spacing={2} padding={2}>
      {products.map((product, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Card 
              sx={{
                width: "100%",
                maxWidth: 400,
                overflow: "initial",
                borderRadius: 2,
              }}
            >
              
                <Box 
                  component={RouterLink} 
                  to={product.navigation}
                >
                  <CardMedia
                    component="img"
                    image={product.src}
                    alt={product.alt}
                    sx={{marginTop: '-20px'}}
                    
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" color="primary">
                      {product.label}
                    </Typography>
                  </CardContent>
                </Box>
              
            </Card>
            </Box>
        </Grid>
      ))}
    </Grid>
  );
}

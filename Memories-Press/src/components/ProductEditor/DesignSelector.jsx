import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import FadeInBox from '../FadeInBox';

export default function DesignSelector({ designs, onSelect, selectedDesignId }) {
  return (
    <Grid container spacing={2}>
      {designs.map((design, index) => (
        <Grid item xs={12} sm={12} md={12} lg={6} key={design.id}>
          <FadeInBox delay={index * 0.08} direction='down' duration={1}>
          <Card 
            variant={selectedDesignId === design.id ? 'outlined' : 'elevation'}
            sx={{
              borderColor: selectedDesignId === design.id ? 'primary.main' : 'transparent',
              borderRadius: 0,
              border: '1px solid grey'
            }}
          >
            <CardActionArea onClick={() => onSelect(design)}>
              <CardMedia
                component="img"
                height="auto"
                image={design.frontImage}
                alt={design.label}
                sx={{
                  objectFit: 'contain',
                }}
              />
              {/* <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                {design.label}
              </Typography> */}
            </CardActionArea>
          </Card>
          </FadeInBox>
        </Grid>
      ))}
    </Grid>
  );
}
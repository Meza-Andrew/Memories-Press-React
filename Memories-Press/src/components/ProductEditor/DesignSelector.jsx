import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, Typography } from '@mui/material';

export default function DesignSelector({ designs, onSelect, selectedDesignId }) {
  return (
    <Grid container spacing={2}>
      {designs.map((design) => (
        <Grid item xs={6} sm={4} md={3} key={design.id}>
          <Card 
            variant={selectedDesignId === design.id ? 'outlined' : 'elevation'}
            sx={{
              borderColor: selectedDesignId === design.id ? 'primary.main' : 'transparent',
            }}
          >
            <CardActionArea onClick={() => onSelect(design)}>
              <CardMedia
                component="img"
                height="140"
                image={design.frontImage}
                alt={design.label}
                sx={{
                  objectFit: 'contain',
                }}
              />
              <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                {design.label}
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
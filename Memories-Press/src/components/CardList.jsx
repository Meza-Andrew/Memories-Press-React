import React from 'react';
import { Card, CardContent, CardActions, Typography, Grid, Box } from '@mui/material';
import StyledButton from './StyledButton';

export default function CardList({
  title,
  cards = [],
}) {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 600,
          color: 'maroon',
          marginBottom: 4,
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={4} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: card.cardColor || '#f9f9f9',
                borderRadius: 2,
                boxShadow: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <Box
                component="img"
                src={"./Media.png"}
                alt={card.title}
                sx={{
                  width: '100%',
                  maxHeight: 260,
                  objectFit: 'cover',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                  {card.subtitle}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'right', paddingBottom: 2, paddingRight: 2 }}>
                <StyledButton
                  color={card.buttonTextColor}
                  backgroundColor={card.buttonBgColor}
                  onClick={card.onClick}
                  small
                >
                  {card.buttonText}
                </StyledButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

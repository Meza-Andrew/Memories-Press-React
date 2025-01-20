import React from 'react';
import { Box, Paper, Grid } from '@mui/material';
import FadeInBox from './FadeInBox';

const ColorGrid = ({ setBackgroundColor, backgroundColors, isMobile }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowX: isMobile ? 'scroll' : 'hidden',
        overflowY: isMobile ? 'hidden' : 'scroll',
        whiteSpace: isMobile ? 'nowrap' : 'normal',
        padding: 3,
        border: '2px solid #ddd',
        ...(isMobile && {
          display: 'flex',
          flexDirection: 'row',
          gap: '34px',
        }),
      }}
    >
      {isMobile ? (
        backgroundColors.map((color, index) => (
          <FadeInBox delay={index * 0.02} direction='down' triggerOnce={false} threshold={0.01} distance={30}>
            <Paper
              key={index}
              elevation={5}
              sx={{
                flex: '0 0 auto',
                width: '78px',
                height: '123px',
              }}
            >
              <Box
                onClick={() => setBackgroundColor(color)}
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${color.front})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid #ddd',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Paper>
          </FadeInBox>
        ))
      ) : (
        <Grid container spacing={3} >
          {backgroundColors.map((color, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <FadeInBox delay={index * 0.06} direction='down'>
              <Paper elevation={3}>
                <Box
                  onClick={() => setBackgroundColor(color)}
                  sx={{
                    width: '100%',
                    paddingTop: '158%',
                    backgroundImage: `url(${color.front})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid #ddd',
                    cursor: 'pointer',
                    transition: 'transform 0.4s ease, opacity 0.6s ease, border 0.6s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'scale(1.25)',
                      border: '2px solid black',
                    },
                  }}
                />
              </Paper>
              </FadeInBox>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ColorGrid;
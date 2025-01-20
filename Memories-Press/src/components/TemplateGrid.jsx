import React from 'react';
import { Box, Paper, Grid } from '@mui/material';

const ColorGrid = ({ setBackgroundColor, backgroundColors, isMobile }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflowX: isMobile ? 'scroll' : 'hidden',
        overflowY: isMobile ? 'hidden' : 'scroll',
        whiteSpace: isMobile ? 'nowrap' : 'normal',
        padding: '10px',
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
        ))
      ) : (
        <Grid container spacing={3} >
          {backgroundColors.map((color, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper elevation={5}>
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
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ColorGrid;
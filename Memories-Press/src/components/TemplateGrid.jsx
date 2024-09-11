import React from 'react';
import { Box, Grid, Paper } from '@mui/material';

const ColorGrid = ({ setBackgroundColor, backgroundColors }) => {
  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '520px',
        overflowY: 'scroll',
        padding: '10px',
        border: '2px solid #ddd',
      }}
    >
      <Grid container spacing={4} justifyContent='space-evenly'>
        {backgroundColors.map((color, index) => (
          <Grid item key={index}>
            <Paper elevation={5}>
              <Box
                onClick={() => setBackgroundColor(color)}
                sx={{
                  width: '100px',
                  height: '150px',
                  backgroundColor: color,
                  border: '2px solid #ddd',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: .8,
                  }
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorGrid;

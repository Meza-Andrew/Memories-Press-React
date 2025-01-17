import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from './StyledButton';

function CTA() {
  return (
    <Box
      sx={{
        backgroundColor: '#ffe4e1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 2,
          padding: 6,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: 'auto',
          width: '100%',
        }}
      >
        <Box
          component="img"
          src="./ring.svg"
          alt="Decorative ring"
          sx={{
            width: { xs: '60%', sm: '300px' },
            marginBottom: 3,
          }}
        />
        <Typography variant="h4" fontSize={32} sx={{ fontWeight: 600, color: 'maroon' }}>
          Let us help you create a lasting memory.
        </Typography>
        {/* DESKTOP */}
        <Typography
          variant="body1"
          fontSize={18}
          lineHeight={1.9}
          sx={{
            display: { xs: 'none', sm: 'block' },
            color: 'black',
            marginY: 3,
            width: '80%',
            justifySelf: 'center'
          }}
        >
          During this difficult time, we're here to help you design a meaningful tribute that honors your
          loved one's life. Our heartfelt approach and simple process allow you to focus on celebrating
          cherished memories with family, while we handle the details with care.
        </Typography>
        {/* MOBILE */}
        <Typography
          variant="body1"
          fontSize={18}
          lineHeight={1.9}
          sx={{
            display: { xs: 'block', sm: 'none' },
            color: 'black',
            marginY: 3,
          }}
        >
          During this difficult time, we're here to help you design a meaningful tribute that honors your
          loved one's life. Our heartfelt approach and simple process allow you to focus on celebrating
          cherished memories with family, while we handle the details with care.
        </Typography>
        <StyledButton>Begin your tribute now</StyledButton>
      </Box>
    </Box>
  );
}

export default CTA;

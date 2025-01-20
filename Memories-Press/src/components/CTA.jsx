import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from './StyledButton';
import FadeInBox from './FadeInBox';

function CTA({showBackground = true}) {
  return (
    <Box
      sx={{
        backgroundColor: showBackground ? '#ffe4e1' : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        width: 'auto'
      }}
    >
      <Box
        sx={{
          backgroundColor: showBackground ? '#ffffff' : 'transparent',
          borderRadius: showBackground ? 2 : 0,
          padding: 6,
          boxShadow: showBackground ? '0px 4px 10px rgba(0, 0, 0, 0.1)': 'none',
          textAlign: 'center',
          maxWidth: 'auto',
          width: '100%',
        }}
      >
        <FadeInBox>
          <Box
            component="img"
            src="./ring.svg"
            alt="Decorative ring"
            sx={{
              width: { xs: '60%', sm: '300px' },
              marginBottom: 3,
            }}
          />
        </FadeInBox>
        <FadeInBox delay={0.2}>
          <Typography variant="h4" fontSize={{xs: 28, md: 32}} sx={{ fontWeight: 600, color: 'maroon', mb: 2 }}>
            Let us help you create a lasting memory.
          </Typography>
        </FadeInBox>
        <FadeInBox delay={0.3}>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.9}
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'black',
              marginY: 3,
              maxWidth: '800px',
              justifySelf: 'center'
            }}
          >
            During this difficult time, we're here to help you design a meaningful tribute that honors your
            loved one's life. Our heartfelt approach and simple process allow you to focus on celebrating
            cherished memories with family, while we handle the details with care.
          </Typography>
        </FadeInBox>
        <FadeInBox>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.9}
            sx={{
              display: { xs: 'none', sm: 'none' },
              color: 'black',
              marginY: 3,
            }}
          >
            During this difficult time, we're here to help you design a meaningful tribute that honors your
            loved one's life. Our heartfelt approach and simple process allow you to focus on celebrating
            cherished memories with family, while we handle the details with care.
          </Typography>
        </FadeInBox>
        <FadeInBox delay={0.4}>
          <StyledButton small>Begin your tribute now</StyledButton>
        </FadeInBox>
      </Box>
    </Box>
  );
}

export default CTA;
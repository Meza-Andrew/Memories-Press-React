import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
import StyledButton from './StyledButton';
import FadeInBox from './FadeInBox';

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  maxWidth: '1200px',
  margin: '0 auto',
}));

export default function SplitContent({
  imageSrc = null,
  heading,
  subheading,
  buttonText,
  onButtonClick,
  stacked = true,
  leftPadding = { xs: 0, md: 0 },
  buttonWidthMobile = { xs: '100%', md: 'auto' },
  headingAlign = 'left',
  subheadingAlign = 'left',
  buttonAlign = 'left',
  imageAlign = { xs: 'center', md: 'left' },
  path,
  small,
  reduceImg
}) {
  return (

    <StyledContainer>
      <Grid container spacing={4} alignItems="center">
        {imageSrc && (
          <Grid
            item
            xs={stacked ? 12 : 6}
            md={4}
            sx={{
              textAlign: imageAlign,
            }}
          >
            <FadeInBox>
            <Box
              component="img"
              src={imageSrc}
              alt="Optional Image"
              sx={{
                maxWidth: reduceImg ? reduceImg : '100%',
                height: 'auto',
                pl: leftPadding,
              }}
            />
            </FadeInBox>
          </Grid>
        )}
        <Grid item xs={stacked ? 12 : 6} md={imageSrc ? 8 : 12}>
          <FadeInBox delay={0.1}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: 26,
                color: 'maroon',
                marginBottom: 2,
                textAlign: headingAlign,
              }}
            >
              {heading}
            </Typography>
          </FadeInBox>
          <FadeInBox delay={0.2}>
            <Typography
              variant="body1"
              sx={{
                color: 'black',
                marginBottom: 3,
                textAlign: subheadingAlign,
              }}
            >
              {subheading}
            </Typography>
          </FadeInBox>
          <Box sx={{ textAlign: buttonAlign }}>
            <FadeInBox delay={0.2}>
              <StyledButton
                sx={{
                  width: buttonWidthMobile,
                }}
                onClick={onButtonClick}
                path={path}
                small={small}
              >
                {buttonText}
              </StyledButton>
            </FadeInBox>
          </Box>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}
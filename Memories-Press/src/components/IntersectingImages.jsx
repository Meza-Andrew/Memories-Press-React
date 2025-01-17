import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const IntersectingImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
}));

const StyledImage = styled(Box)(({ xAxis, yAxis, isOdd }) => ({
  position: 'absolute',
  transform: `translate(${isOdd ? -xAxis : xAxis}px, ${isOdd ? -yAxis : yAxis}px)`,
  transition: 'transform 0.3s ease',
  width: '250px',
  height: 'auto',
  zIndex: isOdd ? 1 : 2,
}));

const IntersectingImages = ({ image1, image2, xAxis = 0, yAxis = 0 }) => {
  return (
    <IntersectingImageContainer>
      <StyledImage
        component="img"
        src={image1}
        alt="Image 1"
        xAxis={xAxis}
        yAxis={yAxis}
        isOdd={true}
      />
      <StyledImage
        component="img"
        src={image2}
        alt="Image 2"
        xAxis={xAxis}
        yAxis={yAxis}
        isOdd={false}
      />
    </IntersectingImageContainer>
  );
};

export default IntersectingImages;

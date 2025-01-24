import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import FadeInBox from './FadeInBox';

const StyledPrayerCardGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(6)
}));


const StyledPrayerCard = styled(Box)(({ theme }) => ({

}));

const PrayerCardGrid = ({ prayerCards }) => {
  return (
    <StyledPrayerCardGrid>
      {prayerCards.map((src, index) => (
        <StyledPrayerCard key={index}>
          <FadeInBox delay={index * 0.1} distance={60}>
            <Box
              component="img"
              src={src}
              alt={`Prayer Card ${index + 1}`}
              sx={{
                width: '100%',
                maxHeight: 'auto',
              }}
            />
          </FadeInBox>
        </StyledPrayerCard>
      ))}
    </StyledPrayerCardGrid>
  );
};

export default PrayerCardGrid;
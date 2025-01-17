import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';


const ReviewCardContainer = styled(Box)(({ theme, backgroundColor }) => ({
  backgroundColor: backgroundColor || '#f7fbe8',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '420px',
  height: '280px',
}));

const StarsRow = styled(Box)({
  display: 'flex',
  gap: '4px',
});

const Star = styled(Box)(({ theme, color, borderColor }) => ({
  fontSize: '20px',
  color: color || '#ffd700',
  display: 'inline-block',
  borderRadius: '50%',
  width: '30px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '26px',
  fontWeight: 'bold',
}));

export default function ReviewCard({
  stars = 5,
  reviewTitle = 'Such fast service!',
  reviewText = 'I received my order in less than 24 hours!',
  reviewerName = 'Deena Steeples',
  reviewDate = 'May 2024',
  reviewerImage = 'https://via.placeholder.com/48',
  backgroundColor,
}) {
  return (
    <ReviewCardContainer backgroundColor={backgroundColor}>
      <StarsRow>
        {Array.from({ length: stars }).map((_, index) => (
          <Star key={index} color="#ffd700" borderColor="#e0a800">
          ★
        </Star>
        ))}
      </StarsRow>
      <Typography variant="h5" sx={{ fontWeight: 600, color: '#6c2e44' }}>
        {reviewTitle}
      </Typography>
      <Typography variant="body1" sx={{ color: '#6c2e44' }}>
        {reviewText}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={reviewerImage}
          alt={reviewerName}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#6c2e44' }}>
            {reviewerName}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6c2e44' }}>
            {reviewDate}
          </Typography>
        </Box>
      </Box>
    </ReviewCardContainer>
  );
}

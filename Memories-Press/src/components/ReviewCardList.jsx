import React from 'react';
import { Box, Container } from '@mui/material';
import ReviewCard from './ReviewCard';

export default function ReviewCardList({ showBackground = true }) {
  const reviews = [
    {
      stars: 5,
      title: 'Such fast service!',
      text: 'I received my order in less than 24 hours!',
      reviewerName: 'Deena Steeples',
      date: 'May 2024',
      image: 'https://via.placeholder.com/48',
    },
    {
      stars: 5,
      title: 'Very compassionate service.',
      text: 'I couldn’t believe how supportive the customer service representative was.',
      reviewerName: 'Shaina Thompson',
      date: 'May 2024',
      image: 'https://via.placeholder.com/48',
    },
    {
      stars: 4,
      title: 'They made the process easy.',
      text: 'When our Mom died, it was difficult for all of us. This was one thing we didn’t have to worry about.',
      reviewerName: 'Jessica Smith',
      date: 'Dec 2023',
      image: 'https://via.placeholder.com/48',
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: showBackground ? '#ffe4e1' : 'transparent',
        paddingY: 4,
        boxSizing: 'border-box',
        boxShadow: 'inset 0px 1px 10px rgba(0, 0, 0, 0.1), inset 0px -1px 1px rgba(0, 0, 0, 0.1)',

      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          padding: 2,
          overflowX: 'auto',
          flexWrap: 'nowrap',
          justifyItems: { xs: 'flex-start', md: 'center' },
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingX: { xs: 2, md: 4 },
          overflowY: 'visible',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 auto',
              width: '410px',
            }}
          >
            <ReviewCard
              stars={review.stars}
              reviewTitle={review.title}
              reviewText={review.text}
              reviewerName={review.reviewerName}
              reviewDate={review.date}
              reviewerImage={review.image}
              backgroundColor="#f7fbe8"
              starColor="#ffd700"
            />
          </Box>
        ))}
      </Container>
    </Box>
  );
}
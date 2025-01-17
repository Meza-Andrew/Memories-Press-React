import React from 'react';
import { Box } from '@mui/material';
import ReviewCard from './ReviewCard';

export default function ReviewCardList() {
  let reviews = [
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
        backgroundColor: '#ffe4e1',
        padding: 4,
        borderRadius: 2,
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        flexWrap: 'nowrap',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c95d64',
          borderRadius: '10px',
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
    </Box>
  );
}

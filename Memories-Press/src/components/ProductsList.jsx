import React from 'react';
import { Box, Typography } from '@mui/material';
import SplitContent from './SplitContent';
import FadeInBox from './FadeInBox';

export default function ProductsList() {
  return (
    <Box sx={{ 
      display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        textAlign: 'left',
        padding: {xs: 2, md: 6},
        marginTop: {xs: 3, md: 2},
        gap: 4,
        width: {xs: "100%", md: 'auto'}
     }}>
      <Box>
        <FadeInBox>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              fontSize: 'clamp(2rem, 2vw, 2.6rem)',
              color: 'maroon',
              marginBottom: 3,
              maxWidth: '80%',
            }}
          >
            Explore our funeral stationery options
          </Typography>
        </FadeInBox>
        <FadeInBox delay={0.1}>
          <Typography
            variant="body1"
            sx={{
              color: 'black',
              display: {xs: 'none', md: 'block'},
              fontSize: 'clamp(1.2rem, 1vw, 1.8rem)',
              lineHeight: 1.8,
              marginBottom: 4,
              maxWidth: '70%',
            }}
          >
            Discover our range of customized funeral stationery products designed to provide a heartfelt
            tribute to your loved one. Each piece is crafted with care and personalized to reflect their
            unique life and legacy.
          </Typography>
        </FadeInBox>
      </Box>
      <Box sx={{
        width: {xs: "80%", md: '70%'},
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10
      }}>
      <SplitContent
        imageSrc="./PrayerCard.png"
        heading="Funeral prayer cards"
        subheading="Offer guests a lasting memory with custom funeral prayer cards, personalized with beautiful imagery, text, and prayers."
        buttonText="Design your prayer cards"
        buttonWidthMobile='auto'
        imageAlign={{ xs: 'left', md: 'left' }}
        path="/prayercards/"
        small
      />
      <SplitContent
        imageSrc="./Bookmark.png"
        heading="Funeral bookmarks"
        subheading="Keep a part of your loved one close with custom funeral bookmarks, ideal for embedding memorable quotes or photographs."
        buttonText="Personalize your bookmark"
        buttonWidthMobile='auto'
        onButtonClick={() => alert('Bookmarks Clicked')}
        stacked={true}
        imageAlign={{ xs: 'left', md: 'center' }}
        leftPadding={{ xs: 3, md: 0 }}
        small
        reduceImg={{xs: '100%', md: '80%'}}
        path="/bookmarks/"
      />
      <SplitContent
        imageSrc="./MemorialHeart.png"
        heading="Memorial Hearts"
        subheading="Memorial hearts feature a beloved photo on the front and a cherished quote or prayer on the back, serving as a touching memento of remembrance."
        buttonText="Create your Memorial Heart"
        buttonWidthMobile='auto'
        onButtonClick={() => alert('Memorial Hearts Clicked')}
        stacked={true}
        imageAlign={{ xs: 'left', md: 'left' }}
        small
      />
      </Box>
    </Box>
  );
}
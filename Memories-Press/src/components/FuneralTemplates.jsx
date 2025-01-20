import React from 'react';
import { Box } from '@mui/material';
import SplitContent from './SplitContent';
import PrayerCardGrid from './PrayerCardGrid';
import IntersectingImages from './IntersectingImages';

export default function FuneralPrayerCardTemplates({ path }) {
  const prayerCards = [
    './PrayerCard.png',
    './PrayerCard.png',
    './PrayerCard.png',
    './PrayerCard.png',
  ];

  return (
    <>
      <Box
        sx={{
          display: {xs: 'none', md: 'flex'},
          flexDirection: 'row',
          gap: 4,
          padding: 1,
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <PrayerCardGrid prayerCards={prayerCards} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SplitContent
            heading="See our collection of funeral prayer card templates"
            subheading="Choose from a diverse library of funeral prayer card designs, each thoughtfully created to provide a fitting tribute to your loved ones. Find the perfect template that resonates with your sentiments, and personalize it with photos, prayers, and heartfelt messages. Our selection offers various styles and themes to reflect the individuality of the departed so you can commemorate their life and legacy in a meaningful way."
            buttonText="Get started"
            path="/prayercards/prayercardeditor/"
            stacked={false}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: {xs: 'flex', md: 'none'},
          flexDirection: 'column',
          gap: 0,
          padding: 0,
          mt  : -4,
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <SplitContent
            heading="Explore Memories Press' collection of funeral prayer card templates"
            subheading="Choose from our curated collection of funeral prayer card designs, each crafted to provide a fitting tribute to your loved ones. Find the perfect template that resonates with your sentiments, and personalize it with photos, prayers, and heartfelt messages. Our selection offers various styles and themes to reflect the individuality of the departed so you can find the ideal way to commemorate their life and legacy."
            buttonText="Get started"
            buttonWidthMobile={"80%"}
            path={path}
            onButtonClick={() => alert('View full collection clicked')}
            stacked={true}
            buttonAlign='center'
            headingAlign='center'
          />
        </Box>
        <Box sx={{ flex: 1, mt: -4 }}>
          <IntersectingImages image1={prayerCards[0]} image2={prayerCards[1]} xAxis={73} yAxis={66}/>
        </Box>
      </Box>
    </>
  );
}
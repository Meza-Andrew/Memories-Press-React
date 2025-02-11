import React from 'react';
import { Box } from '@mui/material';
import SplitContent from './SplitContent';
import PrayerCardGrid from './PrayerCardGrid';
import BookmarkGrid from './BookmarkGrid';
import IntersectingImages from './IntersectingImages';

export default function FuneralTemplates({ path, product }) {
  // Define your image arrays
  const prayerCards = [
    './PrayerCard.png',
    './PrayerCard.png',
    './PrayerCard.png',
    './PrayerCard.png',
  ];

  const bookmarks = [
    './Bookmark.png',
    './Bookmark.png',
  ];

  const memorialHearts = [
    './MemorialHeart.png',
    './MemorialHeart.png',
    './MemorialHeart.png',
    './MemorialHeart.png',
  ];

  // Return different layouts based on the product parameter
  if (product === 'prayerCards') {
    return (
      <>
        {/* Desktop layout */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
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
              path={path}
              stacked={false}
            />
          </Box>
        </Box>
        {/* Mobile layout */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 0,
            padding: 0,
            mt: -4,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SplitContent
              heading="Explore Memories Press' collection of funeral prayer card templates"
              subheading="Choose from our curated collection of funeral prayer card designs, each crafted to provide a fitting tribute to your loved ones. Find the perfect template that resonates with your sentiments, and personalize it with photos, prayers, and heartfelt messages. Our selection offers various styles and themes to reflect the individuality of the departed so you can find the ideal way to commemorate their life and legacy."
              buttonText="Get started"
              buttonWidthMobile="80%"
              path={path}
              onButtonClick={() => alert('View full collection clicked')}
              stacked={true}
              buttonAlign="center"
              headingAlign="center"
            />
          </Box>
          <Box sx={{ flex: 1, mt: 0 }}>
            <IntersectingImages image1={prayerCards[0]} image2={prayerCards[1]} xAxis={73} yAxis={66} />
          </Box>
        </Box>
      </>
    );
  } else if (product === 'bookmarks') {
    return (
      <>
        {/* Desktop layout for bookmarks */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            gap: 4,
            padding: 1,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Replace with your BookmarkGrid or similar component */}
            <BookmarkGrid bookmarks={bookmarks} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SplitContent
              heading="See our collection of bookmark templates"
              subheading="Browse through our collection of bookmark templates, perfect for adding a personal touch to your reading experience. Customize your favorite design and make it uniquely yours."
              buttonText="Get started"
              path={path}
              stacked={false}
            />
          </Box>
        </Box>
        {/* Mobile layout for bookmarks */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 0,
            padding: 0,
            mt: -4,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SplitContent
              heading="Explore our collection of bookmark templates"
              subheading="Choose from our curated selection of bookmark designs, each offering unique style and flair. Find the perfect bookmark to reflect your taste and enhance your reading experience."
              buttonText="Get started"
              buttonWidthMobile="80%"
              path={path}
              onButtonClick={() => alert('View full collection clicked')}
              stacked={true}
              buttonAlign="center"
              headingAlign="center"
            />
          </Box>
          <Box sx={{ flex: 1, mt: 0 }}>
            <IntersectingImages image1={bookmarks[0]} image2={bookmarks[1]} xAxis={35} yAxis={66} />
          </Box>
        </Box>
      </>
    );
  } else if (product === 'memorialHearts') {
    return (
      <>
        {/* Desktop layout for memorial hearts */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            gap: 4,
            padding: 1,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Display the memorial heart images */}
            <PrayerCardGrid prayerCards={memorialHearts} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SplitContent
              heading="See our collection of memorial heart templates"
              subheading="Browse through our diverse collection of memorial heart designs that provide a beautiful way to honor the memories of your loved ones. Personalize your chosen template with heartfelt messages and images."
              buttonText="Get started"
              path={path}
              stacked={false}
            />
          </Box>
        </Box>
        {/* Mobile layout for memorial hearts */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            gap: 0,
            padding: 0,
            mt: -4,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <SplitContent
              heading="Explore our collection of memorial heart templates"
              subheading="Choose from our curated selection of memorial heart designs, each created to help you express your memories and feelings. Find the perfect template to celebrate the life and legacy of your loved ones."
              buttonText="Get started"
              buttonWidthMobile="80%"
              path={path}
              onButtonClick={() => alert('View full collection clicked')}
              stacked={true}
              buttonAlign="center"
              headingAlign="center"
            />
          </Box>
          <Box sx={{ flex: 1, mt: 0 }}>
            <IntersectingImages image1={memorialHearts[0]} image2={memorialHearts[1]} xAxis={45} yAxis={85} />
          </Box>
        </Box>
      </>
    );
  } else {
    return null;
  }
}

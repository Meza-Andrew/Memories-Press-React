import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import SplitContent from './SplitContent';

export default function ListPages() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          fontSize: 34,
          color: 'maroon',
          textAlign: 'center',
          marginBottom: 2,
        }}
      >
        Additional resources from Memories Press
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'black',
          textAlign: 'center',
          maxWidth: '800px',
          marginX: 'auto',
          marginBottom: 5,
        }}
      >
        Beyond local services, Memories Press offers a wealth of information to support your funeral
        planning needs. Explore our blog for insightful articles and check our FAQs for quick
        answers to common questions.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            sx={{
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <SplitContent
              heading="Memories Press Blog"
              subheading="The Memories Press Blog offers expert advice, thoughtful tips on memorial planning, and stories that offer support and inspiration during times of loss."
              buttonText="Read our blog"
              buttonWidthMobile={{ xs: '100%', md: '300px' }}
              onButtonClick={() => alert('Read our blog clicked')}
              stacked={true}
              headingAlign="center"
              subheadingAlign="center"
              buttonAlign="center"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <SplitContent
              heading="FAQs"
              subheading="Have specific questions about funeral planning or our services? Our FAQs page provides detailed answers to help you know what to expect."
              buttonText="Visit our FAQs pages"
              buttonWidthMobile={{ xs: '100%', md: '300px' }}
              onButtonClick={() => alert('Visit FAQs clicked')}
              stacked={true}
              headingAlign="center"
              subheadingAlign="center"
              buttonAlign="center"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

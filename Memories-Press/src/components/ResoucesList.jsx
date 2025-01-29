import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from './StyledButton';
import FadeInBox from './FadeInBox';

function ResourceSection({ heading, subheading, buttonText, onClick }) {
  return (
    <Box sx={{ marginBottom: 6 }}>
      <FadeInBox>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: '#4A6222',
            marginBottom: 2,
          }}
        >
          {heading}
        </Typography>
      </FadeInBox>
      <FadeInBox delay={0.1}>
        <Typography
          variant="body1"
          sx={{
            color: 'black',
            marginBottom: 3,
            lineHeight: 1.6,
          }}
        >
          {subheading}
        </Typography>
      </FadeInBox>
      <FadeInBox delay={0.3}>
        <StyledButton
          onClick={onClick}
          small
        >
          {buttonText}
        </StyledButton>
      </FadeInBox>
    </Box>
  );
}

export default function ResourcesList() {
  const resources = [
    {
      heading: 'Insightful resource guides on memorial planning',
      subheading:
        "Explore our collection of articles that offer deep insights into memorial planning. Whether you're looking for advice on choosing the right funeral stationery, tips on how to personalize your tributes, or ideas to celebrate the life of your loved one, we provide valuable guidance to help you make informed decisions.",
      buttonText: 'Read more',
      onClick: () => alert('Read more clicked!'),
    },
    {
      heading: 'Your guide to funeral homes and resources in Stafford, VA',
      subheading:
        'Navigate the funeral planning process with our comprehensive guide to funeral homes and resources in the Stafford, VA area. This guide includes detailed information on local services, helping you find the support and options you need during this challenging time.',
      buttonText: 'Find resources',
      onClick: () => alert('Find resources clicked!'),
    },
    {
      heading: 'Frequently Asked Questions: Everything you need to know',
      subheading:
        'Have questions? Find answers in our FAQ section. This resource is designed to provide quick and clear responses to help ease your planning process.',
      buttonText: 'Learn more',
      onClick: () => alert('Learn more clicked!'),
    },
  ];

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'right', //well this obv isnt going right, homepage, fix this section
      textAlign: 'left',
      padding: {xs: 2, md: 6},
      gap: 4,
      width: {xs: "80%", md: '65%'} }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'left',
          color: 'maroon',
          marginBottom: 6,
        }}
      >
        Resources and guidance to support your journey
      </Typography>
      {resources.map((resource, index) => (
        <FadeInBox key={index} delay={index * 0.2}>
          <ResourceSection
            heading={resource.heading}
            subheading={resource.subheading}
            buttonText={resource.buttonText}
            buttonColor="white"
            buttonBgColor={resource.buttonBgColor}
            onClick={resource.onClick}
          />
        </FadeInBox>
      ))}
    </Box>
  );
}
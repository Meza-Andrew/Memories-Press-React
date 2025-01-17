import React from 'react';
import { Box, Typography } from '@mui/material';
import StyledButton from './StyledButton';

function ResourceSection({ heading, subheading, buttonText, onClick, buttonColor, buttonBgColor }) {
  return (
    <Box sx={{ marginBottom: 6 }}>
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
      <StyledButton
        backgroundColor={buttonBgColor || '#c95d64'}
        color={buttonColor || 'white'}
        onClick={onClick}
      >
        {buttonText}
      </StyledButton>
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
      justifyContent: 'right',
      textAlign: 'left',
      padding: {xs: 2, md: 8},
      gap: 4,
      width: {xs: "100%", md: '900px'} }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          color: 'maroon',
          marginBottom: 6,
        }}
      >
        Resources and guidance to support your journey
      </Typography>
      {resources.map((resource, index) => (
        <ResourceSection
          key={index}
          heading={resource.heading}
          subheading={resource.subheading}
          buttonText={resource.buttonText}
          buttonColor="white"
          buttonBgColor={resource.buttonBgColor}
          onClick={resource.onClick}
        />
      ))}
    </Box>
  );
}

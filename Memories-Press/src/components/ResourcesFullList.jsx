import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import StyledButton from './StyledButton';
import FadeInBox from './FadeInBox';

const ResourcesFullList = () => {
  const cardsData = [
    {
      sectionTitle: 'Funeral homes',
      description: `Choose from a range of reputable funeral homes in the greater Stafford area, each offering a variety of services tailored to meet your family's needs during this difficult time.`,
      cards: [
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
      ],
    },
    {
      sectionTitle: 'Florists',
      description: `Find expert florists in Stafford, VA, who can provide beautiful floral arrangements to honor the memory of your loved one and bring comfort to grieving friends and family.`,
      cards: [
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
        {
          title: 'Title',
          subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
          buttonText: 'Enabled',
        },
        
      ],
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <FadeInBox>
        <Typography
          variant="h3"
          sx={{ textAlign: 'left', fontWeight: 700, color: 'maroon', marginBottom: 2 }}
        >
          Stafford funeral and memorial services
        </Typography>
      </FadeInBox>
      <FadeInBox delay={0.1}>
        <Typography
          variant="body1"
          sx={{ textAlign: 'left', fontWeight: 400, marginBottom: 6 }}
        >
          Find all the local resources you need in Stafford, VA, to plan a dignified and memorable service for your loved one. From funeral homes to florists, explore our curated list of trusted partners.
        </Typography>
      </FadeInBox>
      {cardsData.map((section, idx) => (
        <Box key={idx} sx={{ marginBottom: 6 }}>
          <FadeInBox delay={0.2}>
            <Typography
              variant="h4"
              sx={{ color: 'green', fontWeight: 600, marginBottom: 2 }}
            >
              {section.sectionTitle}
            </Typography>
          </FadeInBox>
          <FadeInBox delay={0.3}>
            <Typography variant="body1" sx={{ marginBottom: 4 }}>
              {section.description}
            </Typography>
          </FadeInBox>
          <Grid container spacing={10}>
            {section.cards.map((card, cardIdx) => (
              <Grid item xs={12} sm={6} md={6} key={cardIdx}>
                <FadeInBox delay={cardIdx * 0.05}>
                <Card
                  sx={{
                    borderRadius: 2,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box
                    component="img"
                    src="./Media.png"
                    alt={card.title}
                    sx={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                      {card.subtitle}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'right', padding: 2 }}>
                    <StyledButton small >
                      {card.buttonText}
                    </StyledButton>
                  </CardActions>
                </Card>
                </FadeInBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ResourcesFullList;
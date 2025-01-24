import React from 'react';
import HeroResources from './HeroResources';
import ResourcesFullList from './ResourcesFullList';
import CTA_Partner from './CTA_Partner';
import { Container } from '@mui/material';

function Resources() {
  return (
    <>
      <HeroResources/>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          paddingTop: 8,
        }}
      >
        <ResourcesFullList/>
      </Container>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          paddingY: 8,
        }}
      >
        <CTA_Partner/>
      </Container>
    </>
  )
}

export default Resources;
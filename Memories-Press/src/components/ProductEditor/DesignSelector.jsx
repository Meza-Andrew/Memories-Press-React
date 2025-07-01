import React, { useState } from 'react';
import { Grid, Card, CardActionArea, Box, Typography } from '@mui/material';
import FadeInBox from '../FadeInBox';
import { BeatLoader } from 'react-spinners';

const TEMPLATE_WIDTH = 750;
const TEMPLATE_HEIGHT = 1200;

function DesignCard({ design, onSelect, selectedDesignId, delay }) {
  // const [imgLoaded, setImgLoaded] = useState(false);
  const isSelected = selectedDesignId === design.id;

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <FadeInBox delay={delay} direction="down" duration={1}>
        <Card
          variant={isSelected ? 'elevation' : 'outlined'}
          sx={{
            position: 'relative',
            border: '2px solid grey',
            borderColor: isSelected ? 'gray' : 'transparent',
            borderRadius: 0,
            transition: 'box-shadow 0.5s ease, border-color 0.3s ease',
            '&:hover': { boxShadow: '0 0 5px 2px rgba(99, 99, 99, 0.4)' },
          }}
        >
          <CardActionArea onClick={() => onSelect(design)}>
            {/* {imgLoaded && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  zIndex: 1,
                }}
              >
                <BeatLoader />
              </Box>
            )} */}
            <Box sx={{ position: 'relative', width: '100%', aspectRatio: '5/8' }}>
                    <Box
                      component="img"
                      src={design.frontImage}
                      alt={design.label}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                    {design.front?.overlays?.map((ov, idx) => {
                      const leftPct = (ov.x / TEMPLATE_WIDTH) * 100;
                      const topPct = (ov.y / TEMPLATE_HEIGHT) * 100;
                      const widthPct = (ov.width / TEMPLATE_WIDTH) * 100;
                      const heightPct = (ov.height / TEMPLATE_HEIGHT) * 100;
                      return (
                        <Box
                          key={idx}
                          component="img"
                          src={ov.src}
                          alt={`overlay-${idx}`}
                          sx={{
                            position: 'absolute',
                            left: `${leftPct}%`,
                            top: `${topPct}%`,
                            width: `${widthPct}%`,
                            height: `${heightPct}%`,
                            objectFit: 'contain',
                            pointerEvents: 'none',
                            zIndex: 10,
                          }}
                        />
                      );
                    })}
                  </Box>
          </CardActionArea>
        </Card>
      </FadeInBox>
    </Grid>
  );
}

export default function DesignSelector({ designs, onSelect, selectedDesignId, loading }) {
  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}
      >
        <BeatLoader />
      </Box>
    );
  }

  if (!Array.isArray(designs) || designs.length === 0) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', p: 2 }}>
        <Typography variant="body1">No designs available</Typography>
      </Box>
    );
  }

  return (
    <Box height="100%">
    <Grid container spacing={2}>
      {designs.map((design, index) => (
        <DesignCard
          key={design.id}
          design={design}
          onSelect={onSelect}
          selectedDesignId={selectedDesignId}
          delay={index * 0.06}
        />
      ))}
    </Grid>
    </Box>
  );
}
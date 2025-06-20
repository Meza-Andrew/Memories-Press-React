import React, { useState } from 'react';
import { Grid, Card, CardActionArea, Typography, Box } from '@mui/material';
import FadeInBox from '../FadeInBox';
import { BeatLoader } from 'react-spinners';

const TEMPLATE_WIDTH = 750;
const TEMPLATE_HEIGHT = 1200;

export default function DesignSelector({ designs, onSelect, selectedDesignId }) {
  const [loading, setLoading] = useState(false);

  return (
    <Grid container spacing={2}>
      {designs.map((design, index) => (
        <Grid item xs={12} sm={12} md={6} lg={6} key={design.id}>
          <FadeInBox delay={index * 0.06} direction="down" duration={1}>
            <Card
              variant={selectedDesignId === design.id ? 'outlined' : 'elevation'}
              sx={{
                borderColor: selectedDesignId === design.id ? 'primary.main' : 'transparent',
                borderRadius: 0,
                border: '1px solid grey',
                transition: 'box-shadow 0.5s ease',
                '&:hover': {
                  boxShadow: '0 0 5px 2px rgba(99, 99, 99, 0.4)',
                },
              }}
            >
              <CardActionArea onClick={() => onSelect(design)}>
                {loading ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '5/8',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <BeatLoader />
                    </Box>
                  </Box>
                ) : (
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
                )}
                {/* <Typography variant="subtitle2" align="center" sx={{ mt: 1 }}>
                  {design.label}
                </Typography> */}
              </CardActionArea>
            </Card>
          </FadeInBox>
        </Grid>
      ))}
    </Grid>
  );
}
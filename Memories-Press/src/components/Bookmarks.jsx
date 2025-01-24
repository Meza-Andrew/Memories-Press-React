import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import StyledButton from './StyledButton';
import ReviewCardList from './ReviewCardList';
import FuneralTemplates from './FuneralTemplates';
import CustomizableSpecs from './Customizable_Specs';
import ResourceSection from './ResourceCards';
import CTA from './CTA';

function Bookmarks() {
  const title = 'Customizable specifications';
  const description =
    'Choose from a variety of finishes to create a custom bookmark that reflects your loved one’s personality and values. Options include matte, gloss, or soft-touch finishes, along with different fonts and layout choices.';
  const finishes = [
    {
      name: 'Matte',
      description:
        'A subtle, non-reflective finish that offers a sophisticated and understated elegance, perfect for a serene and timeless tribute.',
    },
    {
      name: 'Gloss',
      description:
        'A shiny, reflective finish that enhances colors and details, providing a vibrant and polished look to your bookmarks',
    },
    {
      name: 'Soft touch',
      description:
        'A luxurious, velvety finish that feels gentle to the touch, adding a unique and comforting texture to your personalized bookmarks.',
    },
  ];
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          marginTop: {xs: -9, md: -2},
          overflow: {xs: 'hidden', md: 'visible'},
        }}
      >
        <Box
          component="video"
          autoPlay
          loop
          muted
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: { xs: '100vh', md: 'auto' },
            maxHeight: '700px',
            objectFit: 'cover',
            zIndex: -1,
            filter: 'brightness(102%) blur(1px)'
          }}
        >
          <source src="./videos/background_flowers.webm" type="video/webm" />
          Your browser does not support the video tag.
        </Box>
        <Container
          maxWidth="xl"
          sx={{
            marginTop: { xs: 13, md: 2 },
            padding: { xs: 2, md: 8 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            rowGap: 4,
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '70%' },
              display: 'flex',
              flexDirection: 'column',
              rowGap: 4,
              textAlign: { xs: 'center', md: 'left' },
              zIndex: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                display: { xs: 'none', md: 'block' },
                fontSize: 'clamp(2rem, 5vw, 4.4rem)',
                fontWeight: 700,
                color: '#D3648B',
              }}
            >
              Funeral bookmarks
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', md: 'flex-start' },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#653948',
                  fontSize: { xs: 'clamp(2rem, 4vw, 3rem)', md: 'clamp(1.5rem, 3vw, 3rem)' },
                  fontWeight: 600,
                  lineHeight: 1.2,
                  maxWidth: { xs: '80%', md: '80%' },
                }}
              >
                Design personalized bookmarks for your loved ones.
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <StyledButton
                backgroundColor="#D3648B"
                color="#FCF46D"
                path="/bookmarks/producteditor/"
                width="auto"
                longButton={true}
              >
                Create now
              </StyledButton>
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <StyledButton
                backgroundColor="#D3648B"
                color="#FCF46D"
                path="/bookmarks/producteditor/"
                width="46%"
              >
                Create now
              </StyledButton>
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '40%' },
              display: 'flex',
              justifyContent: { xs: 'center', md: 'center' },
              alignItems: 'center',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <Box
              component="img"
              src="./Bookmark.png"
              alt="Prayer Card"
              sx={{
                // maxWidth: { xs: '20rem', md: '24.5rem' },
                maxHeight: 'auto',
                width: {xs: 'auto', md: '50%'},
                filter: {
                  xs: 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.3))',
                  md: 'drop-shadow(0px 9px 6px rgba(0, 0, 0, 0.4))',
                }
              }}
            />
          </Box>
          
        </Container>
      </Box>
      <Box
          sx={{
            backgroundColor: '#FFF5F9',
            textAlign: 'center',
            maxWidth: '800px',
            padding: 3,
            justifySelf: 'center',
            paddingTop: { xs: 17, md: 3 },
            margin: { xs: '-9rem auto 0', md: '-10px 22px 0' },
            borderRadius: {xs: 0, md: 2},
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1,
            position: 'relative',

          }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '48px',
                fontWeight: 600,
                color: '#653948',
                marginBottom: 2,
              }}
            >
              The role of funeral bookmarks
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#653948',
                marginBottom: 2,
              }}
            >
              The significance of funeral bookmarks
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '14px', md: '20px' },
              color: '#4a4a4a',
              lineHeight: '35px',
              textAlign: { xs: 'left', md: 'center' },
            }}
          >
            Funeral bookmarks provide a lasting tribute, a gentle way to honor the memory of a loved
            one. Personalized with meaningful symbols, quotes, and prayers, they serve as a tangible
            keepsake for family and friends. At Memories Press, we thoughtfully design each bookmark to
            inspire reflection and provide comfort, helping you celebrate life’s journey and cherish
            the memories shared.
          </Typography>
        </Box>
      <Box
        sx={{
          marginY: 5,
          width: '100%',
        }}
      >
        <ReviewCardList showBackground={false} />
      </Box>
      <Container>
        <FuneralTemplates path="/bookmarks/producteditor/"/>
      </Container>
      <Container maxWidth="100%"
        disableGutters
        sx={{
          paddingTop: 4,
        }}>
      <CustomizableSpecs 
          title={title}
          description={description}
          finishes={finishes}
        />
      </Container>
      <Container disableGutters sx={{
        marginY: {xs: 2, md: 4}
      }}>
        <ResourceSection/>
      </Container>
      <Container
        maxWidth="100%"
        disableGutters
        sx={{
          paddingTop: 4,
        }}
      >
        <CTA showBackground={false}/>
      </Container>
    </>
  );
}

export default Bookmarks;
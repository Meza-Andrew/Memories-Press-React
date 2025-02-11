import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import FadeInBox from './FadeInBox';

const StyledBookmarkGrid = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(6)
}));


const StyledBookmark = styled(Box)(({ theme }) => ({

}));

const BookmarkGrid = ({ bookmarks }) => {
  return (
    <StyledBookmarkGrid>
      {bookmarks.map((src, index) => (
        <StyledBookmark key={index}>
          <FadeInBox delay={index * 0.1} distance={60}>
            <Box
              component="img"
              src={src}
              alt={`Bookmark ${index + 1}`}
              sx={{
                width: '100%',
                maxHeight: 'auto',
              }}
            />
          </FadeInBox>
        </StyledBookmark>
      ))}
    </StyledBookmarkGrid>
  );
};

export default BookmarkGrid;
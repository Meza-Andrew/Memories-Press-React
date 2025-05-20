import { Box, CardMedia } from '@mui/material';

const ReusableImage = ({ imageSrc, alt }) => (
  <Box 
    sx={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      border: '2px solid #e8e8e8',
      borderRadius: 1,
      overflow: 'hidden',
      backgroundColor: '#f9f9f9'
    }}
  >
    <CardMedia
      component="img"
      image={imageSrc}
      alt={alt}
      sx={{
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  </Box>
);

export default ReusableImage;
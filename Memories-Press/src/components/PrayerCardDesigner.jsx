import React, { useState, useCallback, useContext } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import SwipeableViews from 'react-swipeable-views';
import { useMedia } from 'react-use';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/system';
import CartContext from './CartContext';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
});

const BackgroundCard = styled('div')(({ backgroundColor }) => ({
  width: '300px',
  height: '420px',
  backgroundColor,
  borderRadius: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ImagePreview = styled('img')({
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginTop: '30px',
});

const CompositionContainer = styled('div')(({ backgroundColor }) => ({
  width: '300px',
  height: '420px',
  padding: '0px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor,
}));

const CompositionText = styled(Typography)(({ top, left, right, bottom }) => ({
  position: 'absolute',
  top,
  left,
  right,
  bottom,
  width: '100%',
  textAlign: 'center',
  zIndex: 2,
  pointerEvents: 'none', // Prevent text from blocking mouse events on the image
}));

const CropContainer = styled('div')({
  position: 'relative',
  width: '300px',
  height: '400px',
  background: '#333',
});

const ArrowContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '300px',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
});

const steps = ['Select Background', 'Enter Name', 'Upload Photo', 'Crop Photo', 'Provide Lifespan', 'Generate Final Image'];

const backgroundColors = ['#ffebcd', '#ffe4e1', '#fafad2', '#992D48', '#FFA0F7'];

function PrayerCardDesigner() {
  const isMobile = useMedia('(max-width: 600px)');
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dob, setDob] = useState('');
  const [dod, setDod] = useState('');
  const [finalImage, setFinalImage] = useState(null);
  const [smallScaleImage, setSmallScaleImage] = useState(null); // New state for small-scale image
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const { addToCart } = useContext(CartContext);

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => {
    setActiveStep(0);
    setBackgroundColor(backgroundColors[0]);
    setName('');
    setPhoto(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setDob('');
    setDod('');
    setFinalImage(null);
    setSmallScaleImage(null); // Reset small-scale image
    setCurrentColorIndex(0);
  };

  const handleBackgroundColorChange = (index) => {
    setCurrentColorIndex(index);
    setBackgroundColor(backgroundColors[index]);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      handleNext(); // Automatically proceed to the cropping step
    }
  };

  const handleDobChange = (e) => setDob(e.target.value);
  const handleDodChange = (e) => setDod(e.target.value);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const generateFinalImage = async () => {
    const element = document.querySelector("#final-composition");

    try {
      // Generate high-resolution image
      const highResCanvas = await html2canvas(element, {
        scale: 3, // Increase the scale to get higher resolution
        useCORS: true,
        backgroundColor: null, // Ensures background is transparent if needed
      });

      const highResImg = new Image();
      highResImg.src = highResCanvas.toDataURL("image/png");
      setFinalImage(highResImg.src);

      // Generate small-scale image
      const smallScaleCanvas = await html2canvas(element, {
        scale: 0.9, // Decrease the scale for a very small image
        useCORS: true,
        backgroundColor: null,
      });

      const smallScaleImg = new Image();
      smallScaleImg.src = smallScaleCanvas.toDataURL("image/png");
      setSmallScaleImage(smallScaleImg.src);

      // Add the item to the cart
      addToCart({
        name,
        dob,
        dod,
        backgroundColor,
        finalImage: highResImg.src,
        smallScaleImage: smallScaleImg.src
      });

      handleReset(); // Reset the designer after adding to cart
    } catch (error) {
      console.error('Error generating final images:', error);
    }
  };

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg');
    });
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(photo, croppedAreaPixels);
      setPhoto(croppedImage);
      handleNext();
    } catch (e) {
      console.error(e);
    }
  };

  const goToNextColor = () => {
    const newIndex = (currentColorIndex + 1) % backgroundColors.length;
    handleBackgroundColorChange(newIndex);
  };

  const goToPreviousColor = () => {
    const newIndex = (currentColorIndex - 1 + backgroundColors.length) % backgroundColors.length;
    handleBackgroundColorChange(newIndex);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormContainer>
            {isMobile ? (
              <SwipeableViews
                index={currentColorIndex}
                onChangeIndex={handleBackgroundColorChange}
                enableMouseEvents
                style={{ width: '300px', height: '400px' }}
              >
                {backgroundColors.map((color, index) => (
                  <BackgroundCard key={index} backgroundColor={color} />
                ))}
              </SwipeableViews>
            ) : (
              <div style={{ position: 'relative', width: '300px', height: '400px' }}>
                <BackgroundCard backgroundColor={backgroundColor} />
                <ArrowContainer>
                  <IconButton onClick={goToPreviousColor}>
                    <ArrowBack />
                  </IconButton>
                  <IconButton onClick={goToNextColor}>
                    <ArrowForward />
                  </IconButton>
                </ArrowContainer>
              </div>
            )}
          </FormContainer>
        );
      case 1:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="55%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="30%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            <TextField
              label="Enter your loved one's name"
              value={name}
              onChange={handleNameChange}
              style={{ marginTop: '20px' }}
            />
          </FormContainer>
        );
      case 2:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="55%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="30%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            <Button variant="contained" component="label" style={{ marginTop: '20px' }}>
              Upload Photo
              <input type="file" hidden onChange={handlePhotoChange} />
            </Button>
          </FormContainer>
        );
      case 3:
        return (
          <FormContainer>
            <CropContainer>
              {photo && (
                <Cropper
                  image={photo}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              )}
            </CropContainer>
            <Button variant="contained" onClick={showCroppedImage} style={{ marginTop: '10px' }}>
              Save Crop
            </Button>
          </FormContainer>
        );
      case 4:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="55%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="30%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            <TextField
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dob}
              onChange={handleDobChange}
              style={{ marginTop: '20px' }}
            />
            <TextField
              label="Date of Death"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dod}
              onChange={handleDodChange}
              style={{ marginTop: '10px' }}
            />
          </FormContainer>
        );
      case 5:
        return (
          <FormContainer>
            <CompositionContainer id="final-composition" backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              <CompositionText top="55%" variant="h6">{name}</CompositionText>
              <CompositionText bottom="30%" variant="body1">{dob} - {dod}</CompositionText>
            </CompositionContainer>
            {/* <Button variant="contained" onClick={generateFinalImage} style={{ marginTop: '10px' }}>
              Generate Final Image
            </Button> */}
          </FormContainer>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <FormContainer>
            <Typography variant="h5" gutterBottom>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </FormContainer>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={activeStep === steps.length - 1 ? generateFinalImage : handleNext}>
                {activeStep === steps.length - 1 ? 'Add to cart' : 'Next'}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Container>
  );
}

export default PrayerCardDesigner;

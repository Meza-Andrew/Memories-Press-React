import React, { useState, useCallback, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
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
  Paper,
  Grid,
  Stack
} from '@mui/material';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import { useMedia } from 'react-use';
import { ArrowBack, ArrowForward, FileUpload } from '@mui/icons-material';
import LoopIcon from '@mui/icons-material/Loop';
import { styled } from '@mui/system';
import CartContext from './CartContext';
import TemplateGrid from './TemplateGrid';
import ProverbSelector from './ProverbSelector';
import PrayerHero from './PrayerHero';

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
  borderRadius: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ImagePreview = styled('img')({
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginTop: '35px',
});

const CompositionContainer = styled('div')(({ backgroundColor }) => ({
  width: '300px',
  height: '420px',
  padding: '0px',
  borderRadius: '2px',
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
  pointerEvents: 'none',
}));

const CropContainer = styled('div')({
  position: 'relative',
  width: '300px',
  height: '420px',
  borderRadius: '2px',
  background: '#333',
});

const ArrowContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
});

const steps = ['Select Template', 'Enter Name', 'Upload Photo', 'Crop Photo', 'Provide Years', 'Select Proverb', 'Finish'];

const backgroundColors = ['#B2DA8E', '#91C774', '#78B05F', '#98B983', '#79A156', '#5D7F3B', '#6E9648', '#4D7530', '#466324', '#375020', 
  '#96B480', '#84A872', '#AFC396', '#DAB9C7', '#F1D8E2', '#C19BAE', '#D8A4B9', '#C5859A', '#B06484', '#A04669', 
  '#924158', '#794350', '#8A6B78', '#6D4B5B', '#533A46', '#573548', '#4E293B', '#AB8A9B', '#C07BA4', '#DEB3C2']
  ;
const proverbs = [
  'Life is what happens when you’re busy making other plans.',
  'The purpose of our lives is to be happy.',
  'Get busy living or get busy dying.',
  'You only live once, but if you do it right, once is enough.',
  'Many of life’s failures are people who did not realize how close they were to success when they gave up.',
];

function PrayerCardDesigner() {
  const { state } = useLocation();
  const isMobile = useMedia('(max-width: 600px)');
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(state?.item?.backgroundColor || backgroundColors[0]);
  const [name, setName] = useState(state?.item?.name || '');
  const [photo, setPhoto] = useState(state?.item?.photo || null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dob, setDob] = useState(state?.item?.dob || '');
  const [dod, setDod] = useState(state?.item?.dod || '');
  const [finalImage, setFinalImage] = useState(null);
  const [smallScaleImage, setSmallScaleImage] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentProverbIndex, setCurrentProverbIndex] = useState(state?.item?.currentProverbIndex || null);
  const currentProverb = proverbs[currentProverbIndex];
  const [showUpload, setShowUpload] = useState(true);
  const [step, setStep] = useState(6);
  const isDisabled = !name || !photo || !dob || !dod || currentProverbIndex === null;

  const { addToCart, updateCartItem } = useContext(CartContext);
  

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
    setSmallScaleImage(null);
    setCurrentColorIndex(0);
    setCurrentProverbIndex(0);
    navigate('/cart');
  };

  const handleBackgroundColorChange = (index) => {
    setCurrentColorIndex(index);
    setBackgroundColor(backgroundColors[index]);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && isMobile) {
      setPhoto(URL.createObjectURL(file));
      handleNext();
    } else if (file && !isMobile) {
      setPhoto(URL.createObjectURL(file));
      setActiveStep(3);
      setStep(3);
      setShowUpload(false);
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
      const highResCanvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });

      const highResImg = new Image();
      highResImg.src = highResCanvas.toDataURL("image/png");
      setFinalImage(highResImg.src);


      const smallScaleCanvas = await html2canvas(element, {
        scale: 0.9,
        useCORS: true,
        backgroundColor: null,
      });

      const smallScaleImg = new Image();
      smallScaleImg.src = smallScaleCanvas.toDataURL("image/png");
      setSmallScaleImage(smallScaleImg.src);

      if (state?.index !== undefined) {
        updateCartItem(state.index, {
          name,
          dob,
          dod,
          backgroundColor,
          photo,
          finalImage: highResImg.src,
          smallScaleImage: smallScaleImg.src,
          currentProverb, currentProverbIndex
        });
      } else {
        addToCart({
          name,
          dob,
          dod,
          backgroundColor,
          photo,
          finalImage: highResImg.src,
          smallScaleImage: smallScaleImg.src,
          currentProverb, currentProverbIndex
        });
      }
      

      handleReset();
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
      setShowUpload(true);
      handleNext();
      setStep(6);

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

  const goToNextProverb = () => {
    const newIndex = (currentProverbIndex + 1) % proverbs.length;
    setCurrentProverbIndex(newIndex);
  };

  const goToPreviousProverb = () => {
    const newIndex = (currentProverbIndex - 1 + proverbs.length) % proverbs.length;
    setCurrentProverbIndex(newIndex);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <div style={{ position: 'relative', width: '300px', height: '420px' }}>
              {isMobile ? (
                <>
                  <div style={{ position: 'relative', width: '300px', height: '400px' }}>
                  <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
                    <ArrowContainer>
                      <IconButton onClick={goToPreviousColor}>
                        <ArrowBack />
                      </IconButton>
                      <IconButton onClick={goToNextColor}>
                        <ArrowForward />
                      </IconButton>
                    </ArrowContainer>
                  </div>
                  
                </>
              ) : (
                <>
                  <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
                  
                </>
              )}
            </div>
            </Box>
          </FormContainer>
        );
      case 1:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            </Box>
            {isMobile && <TextField
              label="Enter your loved one's name"
              value={name}
              onChange={handleNameChange}
              style={{ marginTop: '20px' }}
            />}
          </FormContainer>
        );
      case 2:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            </Box>
            {isMobile && <Button variant="contained" size='large' component="label" style={{ marginTop: '25px' }}>
              Upload Photo <FileUpload/>
              <input type="file" hidden onChange={handlePhotoChange} />
            </Button>}
          </FormContainer>
        );
      case 3:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
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
            </Box>
            {isMobile && <Button variant="contained" size='large' onClick={showCroppedImage} style={{ marginTop: '25px' }}>
              Save Crop
            </Button>}
          </FormContainer>
        );
      case 4:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            </Box>
            {isMobile && <Box sx={{ display: 'flex', gap: 1.5 }}>
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dob}
        onChange={handleDobChange}
        sx={{ marginTop: '25px' }}
      />
      <TextField
        label="Date of Death"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dod}
        onChange={handleDodChange}
        sx={{ marginTop: '25px' }}
      />
    </Box>}
          </FormContainer>
        );
      case 5:
        return (
          <>
          <FormContainer>
          <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
              <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>
            </CompositionContainer>
            </Box>
          </FormContainer>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '70%',
            margin: 'auto'
          }}>
            <ProverbSelector proverbs={proverbs} currentProverbIndex={currentProverbIndex} setCurrentProverbIndex={setCurrentProverbIndex}/>
          </Box>
          </>
        );
      case 6:
        return (
          <FormContainer>
            <Box sx={{
              border: '1px solid grey',
              borderRadius: 1,
              boxShadow: '5px 5px 5px grey'
            }}>
            <CompositionContainer id="final-composition" backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
              <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>
            </CompositionContainer>
            </Box>
          </FormContainer>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container sx={{marginTop: 7}}>
      <PrayerHero/>
      {isMobile && <Paper sx={{
        padding: 2, marginBottom: 1
      }}>
        <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{!isMobile && label}</StepLabel>
          </Step>
        ))}
        </Stepper>
      </Paper>}
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
            {!isMobile ? <Grid container spacing={4}>
      <Grid item sm={4} md={5} lg={5}>
        <TemplateGrid setBackgroundColor={setBackgroundColor} backgroundColors={backgroundColors} />
      </Grid>
      <Grid item sm={8} md={7} lg={7}>
        <Paper sx={{ height: '520px', padding: 0 }}>
          {getStepContent(step)}
          <Box display="flex" justifyContent="center" margin="auto" >
            {!showUpload ? (
              <Button variant="contained" size="large" onClick={showCroppedImage}>
                Save Crop
              </Button>
            ) : (
              <>
                <Button variant="contained" component="label" size="large">
                  <Typography variant="p" padding={0.1}>
                    Upload Image
                  </Typography>
                  <FileUpload />
                  <input type="file" hidden onChange={handlePhotoChange} />
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item sm={12} md={12} lg={12}>
        <Paper sx={{ padding: 3 }}>
          <Stack rowGap={3}>
            <TextField
              label="Enter your loved one's name"
              value={name}
              onChange={handleNameChange}
              
              fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2}}>
              <TextField
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dob}
                onChange={handleDobChange}
                fullWidth
              />
              <TextField
                label="Date of Death"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={dod}
                onChange={handleDodChange}
                fullWidth
              />
            </Box>
            <ProverbSelector proverbs={proverbs} currentProverbIndex={currentProverbIndex} setCurrentProverbIndex={setCurrentProverbIndex}/>
          </Stack>
        </Paper>
      </Grid>
    </Grid> : 
      <Paper sx={{height: '540px'}}>
      {getStepContent(activeStep)}
      {activeStep === 0 && 
      <Box display="flex" justifyContent="center" margin='auto'>
        <Typography>Choose a template color</Typography>
      </Box>
      }
    {activeStep === steps.length - 1 && 
      <Box display="flex" justifyContent="center" margin='auto'>
        <Button 
          variant="contained" 
          color="primary" 
          size='large' 
          margin='auto' 
          onClick={generateFinalImage}
        >
          Add to cart
        </Button>
      </Box>
      }
    </Paper>}
            {isMobile && <Paper sx={{
              padding: 1,
              marginTop: 1,
              marginBottom: 4
            }}>
            <Box display="flex" justifyContent='space-evenly'  maxWidth={300} margin='auto' gap={2}>
              <Button variant='outlined' size='large' sx={{
                    borderRadius: .5
                  }} disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" size='large' sx={{
                    borderRadius: .5
                  }} color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
                Next
              </Button>
            </Box>
            </Paper>}
          </div>
        )}
      </div>
      {!isMobile &&
      <Box
      sx={{
        display: 'flex',
        margin: 'auto',
        justifyContent: 'center',
        marginTop: 2
      }}
      ><Button
      variant="contained"
      color="primary"
      size="large"
      margin='auto'
      onClick={generateFinalImage}
      disabled={isDisabled}
    >
      Add to cart
    </Button>
    </Box>}
    </Container>
  );
}

export default PrayerCardDesigner;

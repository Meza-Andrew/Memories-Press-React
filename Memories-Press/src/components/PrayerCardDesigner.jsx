import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from "react-router-dom";
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
  Stack
} from '@mui/material';
import html2canvas from 'html2canvas';
import Cropper from 'react-easy-crop';
import { useMedia } from 'react-use';
import { ArrowBack, ArrowForward, FileUpload } from '@mui/icons-material';
import LoopIcon from '@mui/icons-material/Loop';
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

const backgroundColors = ['#A9D27D', '#689834', '#4A6222', '#EFC8D5', '#D3648B', '#653948'];
const proverbs = [
  'Life is what happens when you’re busy making other plans.',
  'The purpose of our lives is to be happy.',
  'Get busy living or get busy dying.',
  'You only live once, but if you do it right, once is enough.',
  'Many of life’s failures are people who did not realize how close they were to success when they gave up.',
];

function PrayerCardDesigner() {
  const isMobile = useMedia('(max-width: 600px)');
  const navigate = useNavigate();
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
  const [smallScaleImage, setSmallScaleImage] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentProverbIndex, setCurrentProverbIndex] = useState(0);

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
    setSmallScaleImage(null);
    setCurrentColorIndex(0);
    setCurrentProverbIndex(0);
    navigate('/');
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

      addToCart({
        name,
        dob,
        dod,
        backgroundColor,
        finalImage: highResImg.src,
        smallScaleImage: smallScaleImg.src
      });

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
          </FormContainer>
        );
      case 1:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
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
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            {isMobile && <Button variant="contained" size='large' component="label" style={{ marginTop: '25px' }}>
              Upload Photo <FileUpload/>
              <input type="file" hidden onChange={handlePhotoChange} />
            </Button>}
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
            {isMobile && <Button variant="contained" size='large' onClick={showCroppedImage} style={{ marginTop: '25px' }}>
              Save Crop
            </Button>}
          </FormContainer>
        );
      case 4:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>}
            </CompositionContainer>
            {isMobile && <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        label="Date of Birth"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dob}
        onChange={handleDobChange}
        sx={{ marginTop: '20px' }}
      />
      <TextField
        label="Date of Death"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dod}
        onChange={handleDodChange}
        sx={{ marginTop: '20px' }}
      />
    </Box>}
          </FormContainer>
        );
      case 5:
        return (
          <FormContainer>
            <CompositionContainer backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>
              <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                <Box
                  sx={{ position: 'absolute', top: '29%', left: 0, right: 0}}
                >
                  <Typography variant="body2" style={{ textAlign: 'center' }}>{proverbs[currentProverbIndex]}</Typography>
                </Box>
                <ArrowContainer>
                  <IconButton onClick={goToPreviousProverb}>
                    <ArrowBack />
                  </IconButton>
                  <IconButton onClick={goToNextProverb}>
                    <ArrowForward />
                  </IconButton>
                </ArrowContainer>
              </div>
            </CompositionContainer>
          </FormContainer>
        );
      case 6:
        return (
          <FormContainer>
            <CompositionContainer id="final-composition" backgroundColor={backgroundColor}>
              {photo && <ImagePreview src={photo} alt="Cropped" />}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              <CompositionText bottom="36%" variant="body1">{dob} - {dod}</CompositionText>
              <CompositionText top="69%" variant="body2">{proverbs[currentProverbIndex]}</CompositionText>
            </CompositionContainer>
          </FormContainer>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container sx={{marginTop: 7}}>
      {isMobile && <Paper sx={{
        padding: 2, marginBottom: 2
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
            {!isMobile ? <Stack direction='row' columnGap={2}>
            <Paper sx={{height: '520px'}}>
              {getStepContent(activeStep)}
              
             
              <Box display="flex" justifyContent="center" margin='auto' >
              {activeStep === steps.length - 1 ?
                <Button 
                  variant="contained" 
                  color="primary" 
                  size='large' 
                  margin='auto' 
                  onClick={generateFinalImage}
                >
                  Add to cart
                </Button> : activeStep === 3 ?
                <Button variant="contained" size='large' onClick={showCroppedImage} >
                Save Crop
              </Button>
                 :
                 <>
                 <Button variant="contained" component="label" size='large' >
                 <Typography variant="p" padding={.1}>
                  Upload Image
                 </Typography>
                 <FileUpload/>
                <input type="file" hidden onChange={handlePhotoChange} />
              </Button>
              {/* <IconButton onClick={()=> setPhoto(null)}>
                <LoopIcon/>
              </IconButton> */}
              </>

              }
              </Box>
              
            </Paper>
            <Box>
        <TextField
          label="Enter your loved one's name"
          value={name}
          onChange={handleNameChange}
          style={{ marginTop: '20px' }}
        />
        
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={handleDobChange}
            sx={{ marginTop: '20px' }}
          />
          <TextField
            label="Date of Death"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dod}
            onChange={handleDodChange}
            sx={{ marginTop: '20px' }}
          />
        </Box>
      </Box>
      </Stack> : 
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
              marginTop: 2
            }}>
            <Box display="flex" justifyContent='space-evenly'  maxWidth={300} margin='auto' gap={2}>
              <Button variant='outlined' size='large'  disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" size='large'  color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
                Next
              </Button>
            </Box>
            </Paper>}
          </div>
        )}
      </div>
    </Container>
  );
}

export default PrayerCardDesigner;

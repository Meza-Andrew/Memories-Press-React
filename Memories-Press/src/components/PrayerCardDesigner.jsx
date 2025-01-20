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
  Stack,
  Card,
  CardContent,
  Avatar,
  CardHeader,
  Divider,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Chip
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
import { motion, useMotionValue, useDragControls } from 'framer-motion';
import templates from './template';

//elias container 2 width

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px',
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

// Existing ImagePreview styled component
const ImagePreview = styled('img')(({ isDragging }) => ({
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginTop: '35px',
  cursor: isDragging ? 'grabbing' : 'grab',
  userSelect: 'none',
}));

// Create a Motion-enhanced ImagePreview
const MotionImagePreview = motion.create(ImagePreview);

// const CompositionContainer = styled('div')(({ backgroundColor }) => ({
//   width: '300px',
//   height: '420px',
//   padding: '0px',
//   borderRadius: '2px',
//   textAlign: 'center',
//   position: 'relative',
//   overflow: 'hidden',
//   backgroundColor,
// }));
  const templateWidth = 787
  const templateHeight = 1237

const CompositionContainer = styled('div')(({ backgroundImage, isMobile }) => ({

  width: `${isMobile ? templateWidth * 0.4 : templateWidth * 0.5}px`,
  height: `${isMobile ? templateHeight * 0.4 : templateHeight * 0.5}px`,  
  padding: '0px',
  borderRadius: '2px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover', // Ensures the image covers the container
  backgroundPosition: 'center', // Centers the image
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
  transform: 'translateY(-500%)',
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

const quantities = [25, 50, 75, 100, 125];

const finishes = ['Matte', 'Gloss', 'Soft'];



function PrayerCardDesigner() {
  const { state } = useLocation();
  const isMobile = useMedia('(max-width: 768px)');
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [template, setTemplate] = useState(state?.item?.template || templates[0]);
  const [name, setName] = useState(state?.item?.name || '');
  const [photo, setPhoto] = useState(state?.item?.photo || null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dob, setDob] = useState(state?.item?.dob || '');
  const [dod, setDod] = useState(state?.item?.dod || '');
  const [finalImage, setFinalImage] = useState(null);
  const [smallScaleImage, setSmallScaleImage] = useState(null);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [currentProverbIndex, setCurrentProverbIndex] = useState(state?.item?.currentProverbIndex || '');
  const currentProverb = proverbs[currentProverbIndex];
  const [showUpload, setShowUpload] = useState(true);
  const [step, setStep] = useState(6);
  const [quantity, setQuantity] = useState(state?.item?.quantity || '');
  const [finish, setFinish] = useState(state?.item?.finish || '');
  const isDisabled = !name || !photo || !dob || !dod || !quantity || !finish || currentProverbIndex === null;
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);


  const { addToCart, updateCartItem } = useContext(CartContext);
  

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => {
    setActiveStep(0);
    setTemplate(templates[0]);
    setName('');
    setPhoto(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setDob('');
    setDod('');
    setFinalImage(null);
    setSmallScaleImage(null);
    setCurrentTemplateIndex(0);
    setCurrentProverbIndex(0);
    navigate('/cart');
  };

  const handleBackgroundColorChange = (index) => {
    setCurrentTemplateIndex(index);
    setTemplate(templates[index]);
  };

  const handleQuantityChange = (event, newQuantity) => {
    if (newQuantity !== null) {
      setQuantity(newQuantity);
    }
  };

  const handleFinishChange = (event, newFinish) => {
    if (newFinish !== null) {
      setFinish(newFinish);
    }
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

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
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
        template: null,
      });

      const highResImg = new Image();
      highResImg.src = highResCanvas.toDataURL("image/png");
      setFinalImage(highResImg.src);


      const smallScaleCanvas = await html2canvas(element, {
        scale: 0.9,
        useCORS: true,
        template: null,
      });

      const smallScaleImg = new Image();
      smallScaleImg.src = smallScaleCanvas.toDataURL("image/png");
      setSmallScaleImage(smallScaleImg.src);

      if (state?.index !== undefined) {
        updateCartItem(state.index, {
          name,
          dob,
          dod,
          template,
          photo,
          finish,
          quantity,
          finalImage: highResImg.src,
          smallScaleImage: smallScaleImg.src,
          currentProverb, currentProverbIndex
        });
      } else {
        addToCart({
          name,
          dob,
          dod,
          template,
          photo,
          finish,
          quantity,
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
    const newIndex = (currentTemplateIndex + 1) % templates.length;
    handleBackgroundColorChange(newIndex);
  };

  const goToPreviousColor = () => {
    const newIndex = (currentTemplateIndex - 1 + templates.length) % templates.length;
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

  const gridSize = 40; // Move in increments of 15 pixels
const constraints = {
  left: -40,
  top: -20,
  right: 40,
  bottom: 20,
};

// Initialize motion values for x and y
const x = useMotionValue(0);
const y = useMotionValue(0);
const dragControls = useDragControls();

const imagePreviewDraggable = (
  <MotionImagePreview
    src={photo}
    alt="Cropped"
    draggable={false}
    drag
    dragControls={dragControls}
    dragListener={false} // Disable automatic drag listening
    dragMomentum={false}
    onPointerDown={(event) => {
      dragControls.start(event); // Manually start the drag
      setIsDragging(true);
    }}
    onPointerUp={() => setIsDragging(false)}
    onDrag={(event, info) => {
      // Calculate new position
      const newX = x.get() + info.delta.x;
      const newY = y.get() + info.delta.y;

      // Snap to grid
      const snappedX = Math.round(newX / gridSize) * gridSize;
      const snappedY = Math.round(newY / gridSize) * gridSize;

      // Ensure within constraints
      const boundedX = Math.max(constraints.left, Math.min(snappedX, constraints.right));
      const boundedY = Math.max(constraints.top, Math.min(snappedY, constraints.bottom));

      // Update motion values
      x.set(boundedX);
      y.set(boundedY);
    }}
    style={{
      x,
      y,
      cursor: isDragging ? 'grabbing' : 'grab',
    }}
    whileHover={{
      scale: 1.02,
      boxShadow: '0 6px 12px rgba(0,0,0,0.7)',
    }}
    animate={{
      scale: isDragging ? 1.02 : 1,
      boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.4)' : 'none',
    }}
    transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }}
    role="button"
    aria-label="Draggable Image Preview"
    tabIndex={0}
  />
);

  

  


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
            
              {isMobile ? (
                <>
                  
                  <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            <div style={{ position: 'relative', width: '100%'}}>
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
                  <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
                  
                </>
              )}
            
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
            <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            </Box>
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
            <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            </Box>
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
            <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              {name && <CompositionText top="50%" variant="h6">{name}</CompositionText>}
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            </Box>
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
            <CompositionContainer backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            </Box>
          </FormContainer>
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
            <CompositionContainer id="final-composition" backgroundImage={template.front} isMobile={isMobile}>
              {photo && imagePreviewDraggable}
              <CompositionText top="50%" variant="h6">{name}</CompositionText>
              {dob && <CompositionText bottom="36%" variant="body1">{formatDate(dob)} - {formatDate(dod)}</CompositionText>}
              {currentProverb && <CompositionText top="69%" variant="body2">{currentProverb}</CompositionText>}
            </CompositionContainer>
            </Box>
          </FormContainer>
        );
      default:
        return 'Unknown step';
    }
  };

  const featureSelection = (
    <>
      <Container disableGutters>
      <Typography variant={isMobile ? 'body2' : 'h6'}>Select Quantity</Typography>
      <ToggleButtonGroup
        value={quantity}
        exclusive
        onChange={handleQuantityChange}
        color="primary"
        sx={{ marginBottom: {xs: .5, md: .6}, height: {xs:'20px', md: '40px'} }}
      >
        <ToggleButton value={25}>25</ToggleButton>
        <ToggleButton value={50}>50</ToggleButton>
        <ToggleButton value={75}>75</ToggleButton>
        <ToggleButton value={100}>100</ToggleButton>
        <ToggleButton value={125}>125</ToggleButton>
      </ToggleButtonGroup>
      </Container>
      <Container disableGutters>
      <Typography variant={isMobile ? 'body2' : 'h6'}>Select Finish</Typography>
      <ToggleButtonGroup
        value={finish}
        exclusive
        onChange={handleFinishChange}
        color="primary"
        sx={{ marginBottom: {xs: .5, md: .6}, height: {xs:'20px', md: '40px'} }}
      >
        <ToggleButton value="Matte">Matte</ToggleButton>
        <ToggleButton value="Gloss">Gloss</ToggleButton>
        <ToggleButton value="Soft">Soft</ToggleButton>
      </ToggleButtonGroup>
      </Container>
      <Box sx={{
        display: 'flex',
        flexDirection: {xs: 'column', md: 'row'},
        justifyContent: 'space-between',
        alignItems: {xs: 'flex-start', md: 'center'},
        maxWidth: '200px'
      }}>
        <Typography variant={isMobile ? 'body2' : 'h6'}>Sub-total</Typography>
        <Typography variant={isMobile ? 'body2' : 'h6'} sx={{
          color: '#D3648B',
          fontStyle: 'italic',
          fontWeight: 400
        }}>$108.35</Typography>
      </Box>
    </>   
  )

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
        <Card sx={{
          height: "100%",
          
        }}>
        <CardHeader
        sx={{
          backgroundColor: 'pink'
        }}
        avatar={
          <Avatar sx={{ bgcolor: 'white', color: 'black', fontStyle: 'italic', fontWeight: 'bold' }} aria-label="step">
            1
          </Avatar>
        }
        
        title={
          <Typography variant='h5' fontStyle='italic'>
            Select a template
          </Typography>
        }
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Divider sx={{
        width: '100%'
      }}/>
      </Box>
      <CardContent sx={{
        height: "700px", 
      }}>
        <TemplateGrid setBackgroundColor={setTemplate} backgroundColors={templates} />
        </CardContent>
        </Card>
      </Grid>
      <Grid item sm={8} md={7} lg={7}>
        
          <Card sx={{
            height: '800px',
            maxWidth: '800px' //elias
          }}>
            <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'pink', color: 'black', fontStyle: 'italic', fontWeight: 'bold' }} aria-label="step">
            2
          </Avatar>
        }
        
        title={
          <Typography variant='h5' fontStyle='italic'>
            Upload your image
          </Typography>
        }
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Divider sx={{
        width: '70%'
      }}/>
      </Box>
      <CardContent>
          {getStepContent(step)}
          
          <Box display="flex" justifyContent="center" margin="auto" sx={{
            padding: 2
          }}>
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
          </CardContent>
          </Card>
        
      </Grid>
      <Grid item sm={12} md={7} lg={7}>
        <Card sx={{ padding: 2 }}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'pink', color: 'black', fontStyle: 'italic', fontWeight: 'bold' }} aria-label="step">
            3
          </Avatar>
        }
        
        title={
          <Typography variant='h5' fontStyle='italic'>
            Enter details
          </Typography>
        }
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Divider sx={{
        width: '90%'
      }}/>
      </Box>
      <CardContent>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid item sm={12} md={5} lg={5}>
        <Card sx={{
          padding: 2
        }}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'pink', color: 'black', fontStyle: 'italic', fontWeight: 'bold' }} aria-label="step">
            4
          </Avatar>
        }
        
        title={
          <Typography variant='h5' fontStyle='italic'>
            Wrapping Up
          </Typography>
        }
      />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
      <Divider sx={{
        width: '80%'
      }}/>
      </Box>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: 2 }}>
              {featureSelection}
            </Box>
          </CardContent>
        </Card>

      </Grid>
    </Grid> : 
      <Paper sx={{height: '100%', paddingBottom: 1}}>
      {getStepContent(activeStep)}
      <Divider sx={{
        marginTop: 1
      }} variant='middle'>
        {/* <Chip label='details'/> */}
      </Divider>
      <Box display="flex" flexDirection='column' justifyContent="center" alignItems='center' margin={3}>
      {activeStep === 0 && 
      <>
        <Typography>Choose a template</Typography>
        <TemplateGrid setBackgroundColor={setTemplate} backgroundColors={templates} isMobile={isMobile}/>
        </>
      }
      {activeStep === 1 && 
        <TextField
          label="Enter your loved one's name"
          value={name}
          onChange={handleNameChange}
        />
      }
      {activeStep === 2 && 
        <Button variant="contained" size='large' component="label" >
          Upload Photo <FileUpload/>
          <input type="file" hidden onChange={handlePhotoChange} />
        </Button>
      }
      {activeStep === 3 && 
        <Button variant="contained" size='large' onClick={showCroppedImage} >
          Save Crop
        </Button>
      }
       {activeStep === 4 && 
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField
            label="Date of Birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dob}
            onChange={handleDobChange}
            sx={{
              width: '120px'
            }}
          />
          <TextField
            label="Date of Death"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={dod}
            onChange={handleDodChange}
            sx={{
              width: '120px'
            }}
          />
        </Box>
      }
      {activeStep === 5 &&
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '70%',
          margin: 'auto'
        }}>
          <ProverbSelector proverbs={proverbs} currentProverbIndex={currentProverbIndex} setCurrentProverbIndex={setCurrentProverbIndex}/>
        </Box>
      }
    {activeStep === steps.length - 1 && 
        <Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', gap: .5, marginTop: -2 }}>
          {featureSelection}
          </Box>
        </Box>
        
      }
      </Box>
    </Paper>}
            {isMobile && <Paper sx={{
              padding: 1,
              marginTop: 1,
              marginBottom: 4
            }}>
            <Box display="flex" justifyContent='space-evenly'  maxWidth={300} margin='auto' gap={2}>
              <Button variant='text' size='large' sx={{
                    borderRadius: .5
                  }} disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {(activeStep === steps.length - 1) ?
              <Button 
              variant="contained" 
              color="primary" 
              size='large' 
              margin='auto' 
              onClick={generateFinalImage}
              disabled={isDisabled}
            >
              Add to cart
            </Button> : 
            <Button variant="contained" size='large' sx={{
              borderRadius: .5
            }} color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
          Next
        </Button>}
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

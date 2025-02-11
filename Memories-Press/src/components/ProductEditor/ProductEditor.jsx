import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { designs } from './designs';
import { templatesConfig, PRODUCT_TYPES } from './templatesConfig';
import DesignSelector from './DesignSelector';
import CropModal from './CropModal';
import CartContext from '../../components/CartContext';
import HiddenFullSizeContainer from './HiddenFullSizeContainer';
import SingleSidePreview from './SingleSidePreview';
import FadeInBox from '../FadeInBox';
import PrayerHero from '../PrayerHero';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const defaultProverbs = [
  'The Lord is my shepherd; I shall not want.',
  'Forever in our hearts.',
  'Rest in peace.',
  'Those we love never truly leave us.',
];

async function getCroppedImg(imageSrc, croppedAreaPixels) {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });
  const canvas = document.createElement('canvas');
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );
  return canvas.toDataURL('image/png');
}

function hasBackSide(design, productConfig) {
  if (!design || !productConfig) return false;
  const tpl = productConfig.templates.find(t => t.id === design.templateId);
  return !!tpl?.back;
}

export default function ProductEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  let productRoute;
  if (location.pathname.includes('prayercards')) {
    productRoute = PRODUCT_TYPES.PRAYER_CARD;
  } else if (location.pathname.includes('bookmarks')) {
    productRoute = PRODUCT_TYPES.BOOKMARK;
  } else if (location.pathname.includes('memorialhearts')) {
    productRoute = PRODUCT_TYPES.MEMORIAL_HEART;
  } else {
    productRoute = PRODUCT_TYPES.BOOKMARK;
  }

  const productDesigns = designs.filter(d => d.productType === productRoute);

  const [userData, setUserData] = useState({
    photo: null,
    name: '',
    middleName: '',
    lastName: '',
    dob: '',
    dod: '',
    proverb: '',
    customProverb: '',
    note: '',
    quantity: 25,
    finish: 'Matte',
  });

  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showBack, setShowBack] = useState(false);

  const hiddenFrontRef = useRef(null);
  const hiddenBackRef = useRef(null);

  const { addToCart, updateCartItem } = useContext(CartContext);

  useEffect(() => {
    return () => {
      if (originalImage) URL.revokeObjectURL(originalImage);
      if (uploadedImage) URL.revokeObjectURL(uploadedImage);
    };
  }, [originalImage, uploadedImage]);

  useEffect(() => {
    if (location.state && location.state.item) {
      const item = location.state.item;
      setEditIndex(location.state.index ?? null);
      setUserData({
        photo: item.photo || null,
        name: item.name || '',
        middleName: item.middleName || '',
        lastName: item.lastName || '',
        dob: item.dob || '',
        dod: item.dod || '',
        proverb: item.currentProverb || '',
        customProverb: '',
        note: item.note || '',
        quantity: item.quantity || 25,
        finish: item.finish || 'Matte',
      });
      setSelectedDesign({
        id: item.designId || '',
        productType: productRoute,
        templateId: item.templateId,
        frontImage: item.frontImage,
        backImage: item.backImage,
        label: item.designLabel || 'Edited Design',
      });
      if (item.photo) {
        setOriginalImage(item.originalPhoto || item.photo);
      }
    }
  }, [location, productRoute]);

  useEffect(() => {
    if (!selectedDesign && (!location.state || !location.state.item) && productDesigns.length > 0) {
      setSelectedDesign(productDesigns[0]);
    }
  }, [selectedDesign, productDesigns, location.state]);

  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        uploadedFileInfo &&
        file.name === uploadedFileInfo.name &&
        file.size === uploadedFileInfo.size
      ) {
        alert('You have already uploaded this image.');
        return;
      }
      const url = URL.createObjectURL(file);
      setOriginalImage(url);
      setUploadedImage(url);
      setUploadedFileInfo({ name: file.name, size: file.size });
      setShowCropModal(true);
      setShowBack(false);
    }
  };

  const handleCropConfirm = async (croppedAreaPixels) => {
    try {
      const croppedBase64 = await getCroppedImg(originalImage, croppedAreaPixels);
      setUserData(prev => ({ ...prev, photo: croppedBase64 }));
    } catch (err) {
      console.error('Error cropping image:', err);
      setUserData(prev => ({ ...prev, photo: originalImage }));
    }
    setShowCropModal(false);
    setShowBack(false);
  };

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  async function captureHiddenContainer(ref) {
    if (!ref.current) {
      console.warn('No container ref found');
      return null;
    }
    await delay(300);
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 1,
        useCORS: true,
        logging: true,
      });
      const dataUrl = canvas.toDataURL('image/png');
      console.log('Captured dataUrl length:', dataUrl?.length || 0);
      if (!dataUrl.startsWith('data:image/png')) {
        throw new Error('Canvas data is not a valid PNG.');
      }
      return dataUrl;
    } catch (err) {
      console.error('Error capturing container:', err);
      return null;
    }
  }

  const handleAddToCart = async () => {
    if (!selectedDesign) {
      alert('Please select a design first.');
      return;
    }
    const smallScaleImage = await captureHiddenContainer(hiddenFrontRef);
    if (!smallScaleImage) {
      alert('Failed to create preview. Try again.');
      return;
    }
    const itemData = {
      productType: productRoute,
      designId: selectedDesign.id,
      templateId: selectedDesign.templateId,
      frontImage: selectedDesign.frontImage,
      backImage: selectedDesign.backImage,
      designLabel: selectedDesign.label,
      photo: userData.photo,
      name: userData.name,
      middleName: userData.middleName,
      lastName: userData.lastName,
      dob: userData.dob,
      dod: userData.dod,
      currentProverb: userData.proverb === 'CUSTOM' ? userData.customProverb : userData.proverb,
      note: userData.note,
      quantity: userData.quantity,
      finish: userData.finish,
      smallScaleImage,
      originalPhoto: originalImage,
    };
    if (editIndex !== null && editIndex >= 0) {
      updateCartItem(editIndex, itemData);
    } else {
      addToCart(itemData);
    }
    navigate('/cart');
  };

  const handleGeneratePdf = async () => {
    if (!selectedDesign) {
      alert('No design selected');
      return;
    }
    const productConfig = templatesConfig[productRoute];
    if (!productConfig) {
      alert('No product config for this route.');
      return;
    }
    const { widthPx, heightPx } = productConfig;
    const frontImgData = await captureHiddenContainer(hiddenFrontRef);
    if (!frontImgData) {
      alert('Front capture failed.');
      return;
    }
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [widthPx, heightPx],
      });
      pdf.addImage(frontImgData, 'PNG', 0, 0, widthPx, heightPx);
      console.log('Front image added.');
      if (hiddenBackRef.current) {
        const backImgData = await captureHiddenContainer(hiddenBackRef);
        if (backImgData) {
          pdf.addPage([widthPx, heightPx]);
          pdf.addImage(backImgData, 'PNG', 0, 0, widthPx, heightPx);
          console.log('Back image added.');
        } else {
          console.warn('Back capture failed or invalid.');
          alert('Failed to capture back image for PDF.');
        }
      }
      pdf.save('myDesign.pdf');
      alert('PDF generated successfully!');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert(`Error generating PDF: ${err.message}`);
    }
  };

  const productConfig = templatesConfig[productRoute];

  const designPickerContent = (
    <Box sx={{ p: 2 }}>
      <DesignSelector
        designs={productDesigns}
        onSelect={handleDesignSelect}
        selectedDesignId={selectedDesign?.id}
      />
    </Box>
  );

  const inputOptionsContent = (
    <FadeInBox>
      <Box sx={{ p: 4 }}>
        {/* Photo Upload Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Upload & Crop Photo</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
            <Button variant="contained" component="label" fullWidth>
              Upload
              <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
            </Button>
            {userData.photo && (
              <Button
                variant="outlined"
                onClick={() => {
                  if (originalImage) {
                    setUploadedImage(originalImage);
                    setShowCropModal(true);
                  }
                }}
                disabled={!userData.photo}
                fullWidth
              >
                Edit
              </Button>
            )}
          </Box>
          {userData.photo && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Photo selected. Re-upload to replace.
            </Typography>
          )}
        </Box>
        {/* Name & Dates Section */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6">Name & Dates</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, gap: 0 }}>
            <TextField
              label="First Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              onFocus={() => setShowBack(false)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              onFocus={() => setShowBack(false)}
              fullWidth
              margin="normal"
            />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'row' }, gap: 2 }}>
              <DatePicker
                label="Date of Birth"
                value={userData.dob ? new Date(userData.dob) : null}
                onChange={(newValue) => {
                  setUserData({
                    ...userData,
                    dob: newValue ? format(newValue, "MMMM d, yyyy") : ""
                  });
                  setShowBack(false);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
              <DatePicker
                label="Date of Death"
                value={userData.dod ? new Date(userData.dod) : null}
                onChange={(newValue) => {
                  setUserData({
                    ...userData,
                    dod: newValue ? format(newValue, "MMMM d, yyyy") : ""
                  });
                  setShowBack(false);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        {/* Proverb Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Proverb or Message</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="proverb-select-label">Select Proverb</InputLabel>
            <Select
              labelId="proverb-select-label"
              value={userData.proverb}
              label="Select Proverb"
              onChange={(e) => {
                setUserData({ ...userData, proverb: e.target.value });
                setShowBack(true);
              }}
              onFocus={() => setShowBack(true)}
            >
              {defaultProverbs.map((p, i) => (
                <MenuItem key={i} value={p}>
                  {p}
                </MenuItem>
              ))}
              <MenuItem value="CUSTOM">Custom...</MenuItem>
            </Select>
          </FormControl>
          {userData.proverb === 'CUSTOM' && (
            <TextField
              label="Custom Proverb"
              multiline
              minRows={2}
              value={userData.customProverb}
              onChange={(e) => setUserData({ ...userData, customProverb: e.target.value })}
              fullWidth
              margin="normal"
              onFocus={() => setShowBack(true)}
            />
          )}
        </Box>
        {/* Finish & Quantity Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">Finish & Quantity</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="finish-select-label">Finish</InputLabel>
              <Select
                labelId="finish-select-label"
                value={userData.finish}
                label="Finish"
                onChange={(e) => {
                  setUserData({ ...userData, finish: e.target.value });
                  setShowBack(false);
                }}
              >
                <MenuItem value="Matte">Matte</MenuItem>
                <MenuItem value="Gloss">Gloss</MenuItem>
                <MenuItem value="Soft">Soft</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="quantity-select-label">Quantity</InputLabel>
              <Select
                labelId="quantity-select-label"
                value={userData.quantity}
                label="Quantity"
                onChange={(e) => {
                  setUserData({ ...userData, quantity: e.target.value });
                  setShowBack(false);
                }}
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={125}>125</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            width: '100%',
            mt: 2
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleGeneratePdf}
            disabled={!selectedDesign}
            fullWidth
          >
            Generate PDF
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            disabled={!selectedDesign}
            fullWidth
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </FadeInBox>
  );

  return (
    <>
      <PrayerHero />
      <Box
        sx={{
          width: '100%',
          maxWidth: 'lg',
          mx: 'auto',
          mt: 1,
          p: { xs: 0.5, sm: 2.5 }
        }}
      >
        {isLargeScreen ? (
          <Box sx={{ display: 'flex', gap: 2.5, height: '100vh' }}>
            {/* Left column */}
            <Paper
              elevation={3}
              sx={{
                width: '35%',
                height: '100%',
                overflowY: 'auto',
                p: 2
              }}
            >
              {designPickerContent}
            </Paper>
            {/* Right column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '65%', gap: 2.5 }}>
              {/* Preview area */}
              <Paper
                elevation={3}
                sx={{
                  height: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  p: 1,
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {selectedDesign ? (
                  <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                    <SingleSidePreview
                      productConfig={productConfig}
                      design={selectedDesign}
                      userData={userData}
                      side={showBack ? 'back' : 'front'}
                    />
                    {/* {selectedDesign && hasBackSide(selectedDesign, productConfig) && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <Button variant="outlined" size="small" onClick={() => setShowBack(b => !b)}>
                          Preview {showBack ? 'Front' : 'Back'}
                        </Button>
                      </Box>
                    )} */}
                  </Box>
                ) : (
                  <Typography>Select a design to see preview</Typography>
                )}
              </Paper>
              {/* Input Options area */}
              <Paper
                elevation={3}
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  p: 2,
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {inputOptionsContent}
              </Paper>
            </Box>
          </Box>
        ) : (
          // Mobile layout
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, height: '50vh' }}>
              <Paper
                elevation={3}
                sx={{
                  width: '35%',
                  height: '100%',
                  overflowY: 'auto',
                  p: 2
                }}
              >
                {designPickerContent}
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  width: '65%',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  p: 1,
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                {selectedDesign ? (
                  <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
                    <SingleSidePreview
                      productConfig={productConfig}
                      design={selectedDesign}
                      userData={userData}
                      side={showBack ? 'back' : 'front'}
                    />
                    {/* {selectedDesign && hasBackSide(selectedDesign, productConfig) && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                      >
                        <Button variant="outlined" size="small" onClick={() => setShowBack(b => !b)}>
                          Preview {showBack ? 'Front' : 'Back'}
                        </Button>
                      </Box>
                    )} */}
                  </Box>
                ) : (
                  <Typography>Select a design to see preview</Typography>
                )}
              </Paper>
            </Box>
            <Paper elevation={3} sx={{ flex: 1, overflowY: 'auto', p: 2, boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
              {inputOptionsContent}
            </Paper>
          </Box>
        )}
        {/* Hidden containers for capturing */}
        {selectedDesign && (
          <HiddenFullSizeContainer
            frontRef={hiddenFrontRef}
            backRef={hiddenBackRef}
            productConfig={productConfig}
            design={selectedDesign}
            userData={userData}
          />
        )}
        {/* Crop Modal */}
        {showCropModal && (
          <CropModal
            open={showCropModal}
            onClose={() => setShowCropModal(false)}
            imageSrc={uploadedImage}
            onCropConfirm={handleCropConfirm}
          />
        )}
      </Box>
    </>
  );
}
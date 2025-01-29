import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery
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
import HiddenFullSizeContainers from './HiddenFullSizeContainer';
import SingleSidePreview from './SingleSidePreview';
import FadeInBox from '../FadeInBox';

/** Optional sample proverbs */
const defaultProverbs = [
  'The Lord is my shepherd; I shall not want.',
  'Forever in our hearts.',
  'Rest in peace.',
  'Those we love never truly leave us.',
];

/** 
 * getCroppedImg: real cropping function for your modal's "croppedAreaPixels"
 */
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

/** Check if design has a back side in the template config. */
function hasBackSide(design, productConfig) {
  if (!design || !productConfig) return false;
  const tpl = productConfig.templates.find(t => t.id === design.templateId);
  return !!tpl?.back;
}

export default function ProductEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  // 1) Determine product type based on the current route
  let productRoute;

  if (location.pathname.includes('prayercards')) {
    productRoute = PRODUCT_TYPES.PRAYER_CARD;
  } else if (location.pathname.includes('bookmarks')) {
    productRoute = PRODUCT_TYPES.BOOKMARK;
  } else if (location.pathname.includes('memorialhearts')) {
    productRoute = PRODUCT_TYPES.MEMORIAL_HEART;
  } else {
    // Fallback to a default product type if none match
    productRoute = PRODUCT_TYPES.BOOKMARK;
  }

  // 2) Filter designs
  const productDesigns = designs.filter(d => d.productType === productRoute);

  // Basic user data
  const [userData, setUserData] = useState({
    photo: null, // Cropped image
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

  // Track the uploaded file's info to prevent re-uploading the same image
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);

  // Original uploaded image (before cropping)
  const [originalImage, setOriginalImage] = useState(null);

  // If editing from cart
  const [editIndex, setEditIndex] = useState(null);
  // Chosen design
  const [selectedDesign, setSelectedDesign] = useState(null);
  // Wizard tab
  const [activeTab, setActiveTab] = useState(0);
  // Crop
  const [showCropModal, setShowCropModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  // Toggle front/back
  const [showBack, setShowBack] = useState(false);

  // Refs for hidden containers
  const hiddenFrontRef = useRef(null);
  const hiddenBackRef = useRef(null);

  // Cart context
  const { addToCart, updateCartItem } = useContext(CartContext);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (originalImage) {
        URL.revokeObjectURL(originalImage);
      }
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [originalImage, uploadedImage]);

  // On mount, check if editing from cart
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

      // Set original image if available
      if (item.photo) {
        setOriginalImage(item.originalPhoto || item.photo); // Ensure 'originalPhoto' is stored when adding to cart
      }
    }
  }, [location, productRoute]);

  /** Switch wizard tab */
  const handleTabChange = (e, newVal) => setActiveTab(newVal);

  /** Handle design pick */
  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
  };

  /** Handle photo upload => store in state for cropping */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Prevent re-uploading the same image
      if (
        uploadedFileInfo &&
        file.name === uploadedFileInfo.name &&
        file.size === uploadedFileInfo.size
      ) {
        alert('You have already uploaded this image.');
        return;
      }

      // Create a new object URL for the original image
      const url = URL.createObjectURL(file);
      setOriginalImage(url); // Store the original image
      setUploadedImage(url); // Set as the image to be cropped
      setUploadedFileInfo({ name: file.name, size: file.size });
      setShowCropModal(true);
    }
  };

  /**
   * Confirm crop => produce a real cropped image 
   * and store it in userData.photo so the preview + PDF show the correct cropped result
   */
  const handleCropConfirm = async (croppedAreaPixels) => {
    try {
      const croppedBase64 = await getCroppedImg(originalImage, croppedAreaPixels);
      setUserData(prev => ({ ...prev, photo: croppedBase64 }));
    } catch (err) {
      console.error('Error cropping image:', err);
      // Fallback: store full image
      setUserData(prev => ({ ...prev, photo: originalImage }));
    }
    setShowCropModal(false);
  };

  /**
   * Utility function: short delay
   */
  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  /**
   * captureHiddenContainer => uses html2canvas on the given ref 
   */
  async function captureHiddenContainer(ref) {
    if (!ref.current) {
      console.warn('No container ref found');
      return null;
    }

    // Wait a short time for the container to definitely render
    await delay(300);

    // Now do the capture
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 1,
        useCORS: true,   // if same domain, typically no problem, but let's keep it
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

  /**
   * handleAddToCart => capture front as small preview
   */
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
      photo: userData.photo, // now the cropped photo 
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
      originalPhoto: originalImage, // Store original image for editing crop later
    };

    if (editIndex !== null && editIndex >= 0) {
      updateCartItem(editIndex, itemData);
    } else {
      addToCart(itemData);
    }

    navigate('/cart');
  };

  /**
   * handleGeneratePdf => captures front/back, then put in PDF
   */
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

    // Capture front
    const frontImgData = await captureHiddenContainer(hiddenFrontRef);
    if (!frontImgData) {
      alert('Front capture failed.');
      return;
    }

    try {
      // Make the PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [widthPx, heightPx],
      });

      pdf.addImage(frontImgData, 'PNG', 0, 0, widthPx, heightPx);
      console.log('Front image added.');

      // If there's a back container
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

      // Optionally add text:
      // pdf.setFontSize(16);
      // pdf.text(`Name: ${userData.name}`, 40, 60);

      pdf.save('myDesign.pdf');
      alert('PDF generated successfully!');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert(`Error generating PDF: ${err.message}`);
    }
  };

  const productConfig = templatesConfig[productRoute];

  // Tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // design
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Select a Design</Typography>
            <DesignSelector
              designs={productDesigns}
              onSelect={handleDesignSelect}
              selectedDesignId={selectedDesign?.id}
            />
          </Box>
        );
      case 1: // photo
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Upload & Crop Photo</Typography>
            
            {/* Upload Photo Button */}
            <Button variant="contained" component="label" sx={{ mt: 1 }}>
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button>
            
            {/* Display message and "Edit Crop" button if photo is selected */}
            {userData.photo && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Photo selected. Re-upload to replace.</Typography>
                
                {/* "Edit Crop" Button */}
                <Button
                  variant="outlined"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    if (originalImage) {
                      setUploadedImage(originalImage); // Use the original image for cropping
                      setShowCropModal(true);
                    }
                  }}
                  disabled={!userData.photo} // Enabled only if photo exists
                >
                  Edit Crop
                </Button>
              </Box>
            )}
          </Box>
        );
      case 2: // name & dates
        return (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Name & Dates</Typography>
            <TextField
              label="First Name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            <TextField
              label="Middle Name"
              value={userData.middleName}
              onChange={(e) => setUserData({ ...userData, middleName: e.target.value })}
            />
            <TextField
              label="Last Name"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
            <TextField
              label="Date of Birth (e.g. December 25, 2024)"
              value={userData.dob}
              onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
            />
            <TextField
              label="Date of Death (e.g. January 1, 2025)"
              value={userData.dod}
              onChange={(e) => setUserData({ ...userData, dod: e.target.value })}
            />
          </Box>
        );
      case 3: // proverb
        return (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Proverb or Message</Typography>
            <FormControl fullWidth>
              <InputLabel id="proverb-select-label">Select Proverb</InputLabel>
              <Select
                labelId="proverb-select-label"
                id="proverb-select"
                value={userData.proverb}
                label="Select Proverb"
                onChange={(e) => setUserData({ ...userData, proverb: e.target.value })}
              >
                {defaultProverbs.map((p, i) => (
                  <MenuItem key={i} value={p}>{p}</MenuItem>
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
              />
            )}
          </Box>
        );
      case 4: // finish & qty
        return (
          <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Finish & Quantity</Typography>
            <FormControl fullWidth>
              <InputLabel id="finish-select-label">Finish</InputLabel>
              <Select
                labelId="finish-select-label"
                value={userData.finish}
                label="Finish"
                onChange={(e) => setUserData({ ...userData, finish: e.target.value })}
              >
                <MenuItem value="Matte">Matte</MenuItem>
                <MenuItem value="Gloss">Gloss</MenuItem>
                <MenuItem value="Soft">Soft</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="quantity-select-label">Quantity</InputLabel>
              <Select
                labelId="quantity-select-label"
                value={userData.quantity}
                label="Quantity"
                onChange={(e) => setUserData({ ...userData, quantity: e.target.value })}
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={125}>125</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!selectedDesign}
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 1 }}
              onClick={handleGeneratePdf}
              disabled={!selectedDesign}
            >
              Generate PDF
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top area: left tabs, right preview */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left side: tabs */}
        <Box sx={{ width: '30%', borderRight: '1px solid #ccc' }}>
          <FadeInBox>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            selectionFollowsFocus
            value={activeTab}
            onChange={handleTabChange}
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Design" />
            <Tab label="Photo" />
            <Tab label="Name & Dates" />
            <Tab label="Proverb" />
            <Tab label="Finish & Qty" />
          </Tabs>
          </FadeInBox>
        </Box>

        {/* Right side: preview */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '70%',
            p: 2,
            overflow: 'hidden',
            height: '100%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Live Preview
          </Typography>

          {selectedDesign && hasBackSide(selectedDesign, productConfig) && (
            <Button variant="outlined" onClick={() => setShowBack(b => !b)}>
              Show {showBack ? 'Front' : 'Back'}
            </Button>
          )}

          {selectedDesign ? (
            <Box
              sx={{
                mt: 2,
                width: '100%',
                height: '80vh',
                border: '1px solid #999',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <SingleSidePreview
                productConfig={productConfig}
                design={selectedDesign}
                userData={userData}
                side={showBack ? 'back' : 'front'}
              />
            </Box>
          ) : (
            <Typography>Select a design to see preview</Typography>
          )}
        </Box>
      </Box>

      {/* Bottom area: tab content */}
      <Box sx={{ height: '40%', borderTop: '1px solid #ccc', overflowY: 'auto' }}>
        {renderTabContent()}
      </Box>

      {/* Hidden containers for front/back capturing */}
      {selectedDesign && (
        <HiddenFullSizeContainers
          frontRef={hiddenFrontRef}
          backRef={hiddenBackRef}
          productConfig={productConfig}
          design={selectedDesign}
          userData={userData}
        />
      )}

      {/* Crop modal */}
      {showCropModal && (
        <CropModal
          open={showCropModal}
          onClose={() => setShowCropModal(false)}
          imageSrc={uploadedImage}
          onCropConfirm={handleCropConfirm}
        />
      )}
    </Box>
  );
}

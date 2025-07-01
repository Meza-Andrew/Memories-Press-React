import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  Backdrop,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import domtoimage from 'dom-to-image-more';
import jsPDF from 'jspdf';
// import { designs } from './designs';
import { templatesConfig, PRODUCT_TYPES } from './templatesConfig';
import DesignSelector from './DesignSelector';
import CropModal from './CropModal';
import CartContext from '../../components/CartContext';
import HiddenFullSizeContainer from './HiddenFullSizeContainer';
import SingleSidePreview from './SingleSidePreview';
import PrayerHero from '../PrayerHero';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import ProverbSelect from './ProverbSelect';
import { useLoadDesignFonts } from './useLoadDesignFonts';
import IconButton from '@mui/material/IconButton';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';
import { BeatLoader } from 'react-spinners';

const username = 'rapi';
const password = 'L3IE 1UMG 8OuA wu6t p2Vf r80i';
const encoded = btoa(`${username}:${password}`);

const mockAPI = [
  {
    "id": 159,
    "name": "funeral-prayer-cards",
    "productType": "PRAYER_CARD",
    "designs": [
      {
        "id": "design_dove-right",
        "templateId": "1",
        "label": "Dove Right",
        "frontImage": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards-Dove-Right-Front.jpg",
        "backImage": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards2-Dove-RIght-Back.jpg",
        "frontImageBleed": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_1_Dove-Right_Front_Bleed.jpg",
        "backImageBleed": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_2_Dove-Right_Back_Bleed.jpg",
        "borderColor": "fade",
        "nameFont": {
          "family": "MonteCarlo",
          "size": "22px",
          "color": "#000000"
        },
        "nameFontAlt": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "dateFont": {
          "family": "Poppins Regular",
          "size": "7px",
          "color": "#000000"
        },
        "dateFontAlt": {
          "family": "Poppins Regular",
          "size": "7px",
          "color": "#000000"
        },
        "prayerFont": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "prayerFontAlt": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "front": {
          "overlays": [
            {
              "src": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_01-Overlay-Dove.png",
              "x": 0,
              "y": 0,
              "width": 750,
              "height": 1200
            }
          ]
        }
      },
      {
        "id": "design_dove-rights",
        "templateId": "1",
        "label": "Dove Right",
        "frontImage": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards-Dove-Right-Front.jpg",
        "backImage": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards2-Dove-RIght-Back.jpg",
        "frontImageBleed": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_1_Dove-Right_Front_Bleed.jpg",
        "backImageBleed": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_2_Dove-Right_Back_Bleed.jpg",
        "borderColor": "fade",
        "nameFont": {
          "family": "MonteCarlo",
          "size": "22px",
          "color": "#000000"
        },
        "nameFontAlt": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "dateFont": {
          "family": "Poppins Regular",
          "size": "7px",
          "color": "#000000"
        },
        "dateFontAlt": {
          "family": "Poppins Regular",
          "size": "7px",
          "color": "#000000"
        },
        "prayerFont": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "prayerFontAlt": {
          "family": "Crimson Text Semibold",
          "size": "22px",
          "color": "#000000"
        },
        "front": {
          "overlays": [
            {
              "src": "https://ttr.laz.mybluehost.me/website_f71474e4/wp-content/uploads/2024/09/Prayer-Cards_01-Overlay-Dove.png",
              "x": 0,
              "y": 0,
              "width": 750,
              "height": 1200
            }
          ]
        }
      }
    ],
    "prices": [
      {
        "option": "Matte",
        "price": 0.01
      },
      {
        "option": "Gloss",
        "price": 10
      },
      {
        "option": "Soft",
        "price": 100
      }
    ]
  },
  {
    "id": 161,
    "name": "funeral-bookmarks",
    "productType": "BOOKMARK",
    "designs": [],
    "prices": [
      {
        "option": "base",
        "price": 0
      }
    ]
  },
  {
    "id": 162,
    "name": "memorial-hearts",
    "productType": "MEMORIAL_HEART",
    "designs": [],
    "prices": [
      {
        "option": "base",
        "price": 0
      }
    ]
  }
]

async function convertBlobUrlToBase64(blobUrl) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}


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

export default function ProductEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

//     useEffect(() => {
//   setProductsLoading(true);

//   const timer = setTimeout(() => {
//     setFetchedProducts(mockAPI);
//     setProductsLoading(false);
//   }, 3000); // 3s delay

//   return () => clearTimeout(timer);
// }, []);


useEffect(() => {
  setProductsLoading(true);

  fetch('https://ttr.laz.mybluehost.me/website_f71474e4/wp-json/mp/v1/products/', {
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    })
    .then((data) => {
      setFetchedProducts(data);
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      setProductsError(err.message);
    })
    .finally(() => {
      setProductsLoading(false);
    });
}, []);


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
console.log('fetchedProducts:', fetchedProducts, 'isArray?', Array.isArray(fetchedProducts))
    const currentProduct = useMemo(
    () => fetchedProducts.find(p => p.productType === productRoute) || {},
    [fetchedProducts, productRoute]
  );

  const productDesigns = useMemo(
    () => Array.isArray(currentProduct.designs) ? currentProduct.designs : [],
    [currentProduct]
  );

  const togglePreviewSide = () => {
    setLoadingPreview(true);
    setTimeout(() => {
      setShowBack((prev) => !prev);
      setLoadingPreview(false);
    }, 300);
  };


  useEffect(() => {
  console.log('Current Product:', currentProduct);
  console.log('Product Route:', productRoute);
  console.log('Fetched Products:', fetchedProducts);
  console.log('productDesigns:', productDesigns);
}, [currentProduct, productRoute, fetchedProducts, productDesigns]);


  // const productDesigns = useMemo(
  //   () => designs.filter((d) => d.productType === productRoute),
  //   [productRoute]
  // );

  const [userData, setUserData] = useState({
    photo: null,
    name: '',
    middleName: '',
    lastName: '',
    dob: '',
    dod: '',
    proverb: '',
    customProverb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    note: '',
    quantity: 25,
    finish: 'Matte',
    selectedFont: 'font1',
    selectedFontBack: 'font1',
  });
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showBack, setShowBack] = useState(
    productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
  );

  const cartItemLoaded = useRef(false);
  const hiddenFrontRef = useRef(null);
  const hiddenBackRef = useRef(null);
  const singleSidePreviewRef = useRef(null);
  const { addToCart, updateCartItem } = useContext(CartContext);

  useLoadDesignFonts(selectedDesign);

  useEffect(() => {
    if (location.state && location.state.item && !cartItemLoaded.current) {
      cartItemLoaded.current = true;
      const item = location.state.item;
      setEditIndex(location.state.index ?? null);

      if (item.photo && item.photo.startsWith('blob:')) {
        convertBlobUrlToBase64(item.photo)
          .then((base64) => {
            setUserData((prev) => ({
              ...prev,
              photo: base64,
              name: item.name || '',
              middleName: item.middleName || '',
              lastName: item.lastName || '',
              dob: item.dob || '',
              dod: item.dod || '',
              note: item.note || '',
              quantity: item.quantity || 25,
              finish: item.finish || 'Matte',
              selectedFont:
                item.selectedFont !== undefined ? item.selectedFont : prev.selectedFont,
              selectedFontBack:
                item.selectedFontBack !== undefined ? item.selectedFontBack : prev.selectedFontBack,
            }));
            setOriginalImage(base64);
          })
          .catch((err) => {
            console.error('Error converting blob to base64:', err);
            setUserData((prev) => ({
              ...prev,
              photo: item.photo || null,
              name: item.name || '',
              middleName: item.middleName || '',
              lastName: item.lastName || '',
              dob: item.dob || '',
              dod: item.dod || '',
              note: item.note || '',
              quantity: item.quantity || 25,
              finish: item.finish || 'Matte',
              selectedFont:
                item.selectedFont !== undefined ? item.selectedFont : prev.selectedFont,
              selectedFontBack:
                item.selectedFontBack !== undefined ? item.selectedFontBack : prev.selectedFontBack,
            }));
            setOriginalImage(item.photo);
          });
      } else {
        setUserData((prev) => ({
          ...prev,
          photo: item.photo || null,
          name: item.name || '',
          middleName: item.middleName || '',
          lastName: item.lastName || '',
          dob: item.dob || '',
          dod: item.dod || '',
          note: item.note || '',
          quantity: item.quantity || 25,
          finish: item.finish || 'Matte',
          selectedFont:
            item.selectedFont !== undefined ? item.selectedFont : prev.selectedFont,
          selectedFontBack:
              item.selectedFontBack !== undefined ? item.selectedFontBack : prev.selectedFontBack,
        }));
        setOriginalImage(item.originalPhoto || item.photo);
      }

      let loadedProverb;
      let loadedCustomProverb = item.customProverb || '';
      if (item.currentProverb && typeof item.currentProverb === 'object') {
        loadedProverb = item.currentProverb;
      } else {
        loadedProverb = 'CUSTOM';
        loadedCustomProverb = item.currentProverb || '';
      }
      setUserData((prev) => ({
        ...prev,
        proverb: loadedProverb,
        customProverb: loadedCustomProverb,
      }));

      const fullDesign =
        productDesigns.find((d) => d.id === item.designId) || {
          id: item.designId || '',
          templateId: item.templateId,
          frontImage: item.frontImage,
          backImage: item.backImage,
          frontImageBleed: item.frontImageBleed,
          backImageBleed: item.backImageBleed,
          label: item.designLabel || 'Edited Design',
          font: item.font,
          fontAlt: item.fontAlt,
        };
      setSelectedDesign(fullDesign);
    }
  }, [location.state, productDesigns]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (
      !selectedDesign &&
      (!location.state || !location.state.item) &&
      productDesigns.length > 0
    ) {
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
      setUserData((prev) => ({ ...prev, photo: croppedBase64 }));
    } catch (err) {
      console.error('Error cropping image:', err);
      setUserData((prev) => ({ ...prev, photo: originalImage }));
    }
    setShowCropModal(false);
    setShowBack(false);
  };

  function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  async function captureHiddenContainer(ref) {
    if (!ref.current) {
      console.warn('No container ref found');
      return null;
    }
    await delay(300);
    try {
      const { bleedWidthPx, bleedHeightPx } = productConfig;
      ref.current.offsetHeight;
      const dataUrl = await domtoimage.toPng(ref.current, {
        width: bleedWidthPx,
        height: bleedHeightPx,
        useCORS: true,
      });
      if (!dataUrl.startsWith('data:image/png')) {
        throw new Error('Captured data is not a valid PNG.');
      }
      return dataUrl;
    } catch (err) {
      console.error('Error capturing container:', err);
      return null;
    }
  }

  async function captureSingleSidePreview() {
    if (!singleSidePreviewRef.current) {
      console.warn('No single side preview ref found');
      return null;
    }
    const wasShowingBack = showBack;
    if (wasShowingBack) {
      setShowBack(false);
      await delay(300);
    }
    const node = singleSidePreviewRef.current;
    const clonedNode = node.cloneNode(true);
    clonedNode.style.transform = 'none';
    clonedNode.style.width = `${productConfig.widthPx}px`;
    clonedNode.style.height = `${productConfig.heightPx}px`;
    clonedNode.style.overflow = 'visible';
    clonedNode.style.boxSizing = 'border-box';
    clonedNode.style.position = 'absolute';
    clonedNode.style.top = '-10000px';
    clonedNode.style.left = '-10000px';
    document.body.appendChild(clonedNode);
    try {
      const dataUrl = await domtoimage.toPng(clonedNode, {
        width: productConfig.widthPx,
        height: productConfig.heightPx,
        useCORS: true,
      });
      return dataUrl;
    } catch (err) {
      console.error('Error capturing single side preview:', err);
      return null;
    } finally {
      document.body.removeChild(clonedNode);
      if (wasShowingBack) {
        setShowBack(true);
      }
    }
  }

  const handleAddToCart = async () => {
    if (!selectedDesign) {
      alert('Please select a design first.');
      return;
    }
    setIsAddingToCart(true);

    const smallScaleImage = await captureSingleSidePreview();
    if (!smallScaleImage) {
      alert('Failed to create preview. Try again.');
      setIsAddingToCart(false);
      return;
    }
    const itemData = {
      productType: productRoute,
      designId: selectedDesign.id,
      templateId: selectedDesign.templateId,
      frontImage: selectedDesign.frontImage,
      backImage: selectedDesign.backImage,
      frontImageBleed: selectedDesign.frontImageBleed,
      backImageBleed: selectedDesign.backImageBleed,
      designLabel: selectedDesign.label,
      font: selectedDesign.font,
      photo: userData.photo,
      name: userData.name,
      middleName: userData.middleName,
      lastName: userData.lastName,
      dob: userData.dob,
      dod: userData.dod,
      currentProverb:
        userData.proverb === 'CUSTOM'
          ? userData.customProverb
          : userData.proverb,
      note: userData.note,
      quantity: userData.quantity,
      finish: userData.finish,
      selectedFont: userData.selectedFont,
      selectedFontBack: userData.selectedFontBack,
      smallScaleImage,
      originalPhoto: originalImage,
      customProverb: userData.customProverb,
    };
    await handleGeneratePdf();
    try {
      if (editIndex !== null && editIndex >= 0) {
        await updateCartItem(editIndex, itemData);
      } else {
        await addToCart(itemData);
      }
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart', error);
      alert('There was an error adding to cart. Please try again.');
      setIsAddingToCart(false);
    }
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
    const { widthPx, heightPx, bleedWidthPx, bleedHeightPx } = productConfig;
    const isLandscape = productRoute === PRODUCT_TYPES.MEMORIAL_HEART;
    const pdfWidth = bleedWidthPx;
    const pdfHeight = bleedHeightPx;
    const pdfOrientation = isLandscape ? 'landscape' : 'portrait';
    console.log(
      `Generating PDF in ${pdfOrientation} mode: ${pdfWidth} x ${pdfHeight}`
    );
    const frontImgData = await captureHiddenContainer(hiddenFrontRef);
    if (!frontImgData) {
      alert('Front capture failed.');
      return;
    }
    try {
      const pdf = new jsPDF({
        orientation: pdfOrientation,
        unit: 'px',
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(frontImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      console.log('Front image added.');
      if (hiddenBackRef.current) {
        const backImgData = await captureHiddenContainer(hiddenBackRef);
        if (backImgData) {
          pdf.addPage([pdfWidth, pdfHeight]);
          pdf.addImage(backImgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
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
    <Box sx={{ p: 2, height: '100%' }}>
      <DesignSelector
        designs={productDesigns}
        onSelect={handleDesignSelect}
        selectedDesignId={selectedDesign?.id}
        loading={productsLoading}
      />
    </Box>
  );

  const inputOptionsContent = (
    <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 2.5 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            backgroundColor: '#D3648B',
            p: 1,
            mb: 0,
            borderTopRightRadius: 20,
            boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Front Side
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            flex: 1,
            mb: { xs: 2, md: 0 },
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <Box
            sx={{
              display: productRoute === 'memorial_heart' ? 'none' : 'block',
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={
                  <FileUploadIcon
                    sx={{
                      fontSize: 'inherit',
                      position: 'relative',
                      top: '-2px',
                    }}
                  />
                }
              >
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (originalImage) {
                    setUploadedImage(originalImage);
                    setShowCropModal(true);
                  }
                }}
                disabled={!userData.photo}
              >
                Edit
              </Button>
            </Box>
            {userData.photo && (
              <Typography
                variant="body2"
                sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}
              >
                Photo selected. Re-upload to replace.
              </Typography>
            )}
          </Box>
          <Box sx={{ mb: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="First Name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                onFocus={() =>
                  setShowBack(
                    productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
                  )
                }
                fullWidth
                margin="none"
              />
              <TextField
                label="Last Name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                onFocus={() =>
                  setShowBack(
                    productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
                  )
                }
                fullWidth
                margin="none"
              />
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <DatePicker
                  label="Date of Birth"
                  value={userData.dob ? new Date(userData.dob) : null}
                  onChange={(newValue) => {
                    setUserData({
                      ...userData,
                      dob: newValue ? format(newValue, 'MMMM d, yyyy') : '',
                    });
                    setShowBack(
                      productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
                    );
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
                      dod: newValue ? format(newValue, 'MMMM d, yyyy') : '',
                    });
                    setShowBack(
                      productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth margin="normal" />
                  )}
                />
              </Box>
            </LocalizationProvider>
            <Box sx={{ mt: 0 }}>
              <Typography variant="h6">Front Side Font</Typography>
              <ToggleButtonGroup
                color="primary"
                value={userData.selectedFont}
                exclusive
                onChange={(e, newFont) => {
                  if (newFont !== null) {
                    setUserData((prev) => ({ ...prev, selectedFont: newFont }));
                    setShowBack(
                      productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? true : false
                    );
                  }
                }}
                sx={{ mt: 1 }}
              >
                <ToggleButton
                  value="font1"
                  sx={{
                    borderRadius: 1,
                    height: 40,
                  }}
                >
                  Font 1
                </ToggleButton>
                <ToggleButton
                  value="font2"
                  sx={{
                    borderRadius: 1,
                    height: 40,
                  }}
                >
                  Font 2
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            backgroundColor: '#D3648B',
            p: 1,
            mb: 0,
            borderTopRightRadius: 20,
            boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
          }}
        >
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Back Side
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          {productRoute === 'memorial_heart' ? (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ color: 'black' }}>
                Upload an image
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={
                    <FileUploadIcon
                      sx={{ fontSize: 'inherit', position: 'relative', top: '-2px' }}
                    />
                  }
                >
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (originalImage) {
                      setUploadedImage(originalImage);
                      setShowCropModal(true);
                    }
                  }}
                  disabled={!userData.photo}
                >
                  Edit
                </Button>
              </Box>
              {userData.photo && (
                <Typography
                  variant="body2"
                  sx={{ mt: 1, fontStyle: 'italic', color: 'gray' }}
                >
                  Photo selected. Re-upload to replace.
                </Typography>
              )}
            </Box>
          ) : (
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  color:
                    productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? '#a1a1a1' : 'black',
                }}
              >
                Proverb or Message
              </Typography>
              <ProverbSelect
                value={userData.proverb}
                onChange={(e) => {
                  setUserData({ ...userData, proverb: e.target.value });
                  setShowBack(true);
                }}
                productType={productRoute}
                disabled={productRoute === PRODUCT_TYPES.MEMORIAL_HEART}
              />
              {userData.proverb === 'CUSTOM' && (
                <TextField
                  label="Custom Proverb"
                  multiline
                  rows={isLargeScreen ? 4 : 6}
                  value={userData.customProverb}
                  onChange={(e) => {
                    const newValue = e.target.value.slice(0, 500);
                    setUserData((prev) => ({ ...prev, customProverb: newValue }));
                  }}
                  fullWidth
                  margin="normal"
                  helperText={`${userData.customProverb.length}/500 characters`}
                  disabled={productRoute === PRODUCT_TYPES.MEMORIAL_HEART}
                  inputProps={{ style: { overflowY: 'auto' } }}
                />
              )}
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color:
                      productRoute === PRODUCT_TYPES.MEMORIAL_HEART ? '#a1a1a1' : 'black',
                  }}
                >
                  Back Side Font
                </Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={userData.selectedFontBack}
                  exclusive
                  disabled={productRoute === PRODUCT_TYPES.MEMORIAL_HEART}
                  onChange={(e, newFont) => {
                    if (newFont !== null) {
                      setUserData((prev) => ({ ...prev, selectedFontBack: newFont }));
                      setShowBack(true);
                    }
                  }}
                  sx={{ mt: 1 }}
                >
                  <ToggleButton
                    value="font1"
                    sx={{
                      borderRadius: 1,
                      height: 40,
                    }}
                  >
                    Font 1
                  </ToggleButton>
                  <ToggleButton
                    value="font2"
                    sx={{
                      borderRadius: 1,
                      height: 40,
                    }}
                  >
                    Font 2
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          )}
        </Paper>
        <Box
          sx={{
            backgroundColor: '#D3648B',
            p: 1,
            mt: 2.5,
            borderTopRightRadius: 20,
          }}
        >
          <Typography variant="h6" sx={{ m: 0, color: 'white' }}>
            Quantity and Finish
          </Typography>
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              mb: 2,
            }}
          >
            <FormControl fullWidth margin="normal">
              <InputLabel id="finish-select-label">Finish</InputLabel>
              <Select
                labelId="finish-select-label"
                value={userData.finish}
                label="Finish"
                onChange={(e) =>
                  setUserData({ ...userData, finish: e.target.value })
                }
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
                onChange={(e) =>
                  setUserData({ ...userData, quantity: e.target.value })
                }
              >
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={75}>75</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={125}>125</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={!selectedDesign || isAddingToCart}
              fullWidth
              size="large"
              startIcon={
                <AddShoppingCartIcon
                  sx={{ fontSize: 'inherit', position: 'relative', top: '-2px' }}
                />
              }
              sx={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center' }}
            >
              Add to Cart
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
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
          p: { xs: 0.5, sm: 2.5 },
        }}
      >
        {isLargeScreen ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2.5, height: '60vh' }}>
              <Box
                sx={{ width: '35%', display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    backgroundColor: '#D3648B',
                    p: 1,
                    mb: 0,
                    borderTopRightRadius: 20,
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ m: 0, textAlign: 'left', color: 'white' }}
                  >
                    Designs
                  </Typography>
                </Box>
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%',
                    overflowY: 'auto',
                    height: '100%',
                    p: 2,
                    mt: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  {designPickerContent}
                </Paper>
              </Box>
              <Box
                sx={{ width: '65%', display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    backgroundColor: '#D3648B',
                    p: 1,
                    mb: 0,
                    borderTopRightRadius: 20,
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ m: 0, textAlign: 'left', color: 'white' }}
                  >
                    Preview
                  </Typography>
                </Box>
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    p: 1,
                    mt: 0,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                >
                  {selectedDesign ? (
                    <Box
                      sx={{ width: '100%', height: '100%', position: 'relative' }}
                    >
                      <SingleSidePreview
                        productConfig={productConfig}
                        design={selectedDesign}
                        userData={userData}
                        side={showBack ? 'back' : 'front'}
                        productType={productRoute}
                        ref={singleSidePreviewRef}
                        loading={loadingPreview}
                      />
                      {loadingPreview && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(146,146,146,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                          }}
                        >
                          {/* <CircularProgress color="primary" /> */}
                        </Box>
                      )}
                      <IconButton
                        onClick={togglePreviewSide}
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: 'rgba(255,255,255,0.7)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                        }}
                        size="large"
                      >
                        <ThreeSixtyIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  zIndex: 1,
                }}
              >
                <BeatLoader />
              </Box>
                  )}
                </Paper>
              </Box>
            </Box>
            {inputOptionsContent}
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, height: '50vh' }}>
              <Paper
                elevation={3}
                sx={{
                  width: '35%',
                  height: '100%',
                  overflowY: 'auto',
                  p: 2,
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
                  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                {selectedDesign ? (
                  <Box
                    sx={{ width: '100%', height: '100%', position: 'relative' }}
                  >
                    <SingleSidePreview
                      productConfig={productConfig}
                      productType={productRoute}
                      design={selectedDesign}
                      userData={userData}
                      side={showBack ? 'back' : 'front'}
                      ref={singleSidePreviewRef}
                      loading={loadingPreview}
                    />
                    <IconButton
                      onClick={() => setShowBack((prev) => !prev)}
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                      }}
                      size="large"
                    >
                      <ThreeSixtyIcon fontSize="large" />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography>Select a design to see preview</Typography>
                )}
              </Paper>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto' }}>{inputOptionsContent}</Box>
          </Box>
        )}
        {selectedDesign && (
          <HiddenFullSizeContainer
            frontRef={hiddenFrontRef}
            backRef={hiddenBackRef}
            productConfig={productConfig}
            design={selectedDesign}
            userData={userData}
            productRoute={productRoute}
          />
        )}
        {showCropModal && (
          <CropModal
            open={showCropModal}
            onClose={() => setShowCropModal(false)}
            imageSrc={uploadedImage}
            design={selectedDesign}
            onCropConfirm={handleCropConfirm}
          />
        )}
      </Box>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={isAddingToCart}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Please wait. Adding to Cart...
        </Typography>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
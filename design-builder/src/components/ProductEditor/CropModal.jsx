import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box } from '@mui/material';
import Cropper from 'react-easy-crop';

export default function CropModal({ open, onClose, imageSrc, design, onCropConfirm }) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const TEMPLATE_WIDTH = 750;
  const TEMPLATE_HEIGHT = 1200;

  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setContainerSize({ width: 0, height: 0 });
    }
  }, [open, design]);

  const measureContainer = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setContainerSize({ width, height });
    }
  };

  useEffect(() => {
    function handleResize() {
      measureContainer();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    onCropConfirm(croppedAreaPixels);
  };

  const overlayScale = 1.0;
  const overlayShiftX = 0;
  const overlayShiftY = 45;

  const renderOverlays = (overlays) => {
    if (!overlays || !overlays.length) return null;
    const { width: cw, height: ch } = containerSize;
    if (!cw || !ch) return null;

    const baseScale = cw / TEMPLATE_WIDTH;
    const scaledTemplateHeight = TEMPLATE_HEIGHT * baseScale;
    const centerOffsetY = (ch - scaledTemplateHeight) / 2;

    return overlays.map((ov, index) => {
      const scale = baseScale * overlayScale;
      const leftPx = ov.x * scale + overlayShiftX;
      const topPx = ov.y * scale + centerOffsetY + overlayShiftY;
      const widthPx = ov.width * scale;
      const heightPx = ov.height * scale;

      return (
        <Box
          key={`overlay-${index}`}
          component="img"
          src={ov.src}
          alt={`overlay-${index}`}
          sx={{
            position: 'absolute',
            left: `${leftPx}px`,
            top: `${topPx}px`,
            width: `${widthPx}px`,
            height: `${heightPx}px`,
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      );
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{
        onEntered: () => {
          measureContainer();
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: '#e0dade', color: 'black' }}>
        Crop Your Photo
      </DialogTitle>

      <Box
        ref={containerRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: 400,
          overflow: 'hidden',
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          cropShape="round"
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: { width: '100%', height: '100%' },
          }}
        />
        {renderOverlays(design?.front?.overlays)}
      </Box>

      <DialogActions sx={{ backgroundColor: '#e0dade' }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
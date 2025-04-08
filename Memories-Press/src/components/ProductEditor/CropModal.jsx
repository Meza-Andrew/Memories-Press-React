import React, { useState, useCallback } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import Cropper from 'react-easy-crop';

export default function CropModal({ open, onClose, imageSrc, onCropConfirm }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleConfirm = async () => {
    onCropConfirm(croppedAreaPixels);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{backgroundColor: '#e0dade', color: 'black'}}>Crop Your Photo</DialogTitle>
      <div style={{ position: 'relative', width: '100%', height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <DialogActions sx={{backgroundColor: '#e0dade'}}>
        <Button onClick={onClose} variant='outlined' color="inherit">Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
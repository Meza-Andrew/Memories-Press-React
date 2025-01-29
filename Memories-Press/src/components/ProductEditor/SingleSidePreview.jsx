import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { renderTemplateElements } from './RenderTemplateElements';

export default function SingleSidePreview({
  productConfig,
  design,
  userData,
  side = 'front',
}) {
  if (!design || !productConfig) return null;

  const currentTemplate = productConfig.templates.find(
    (t) => t.id === design.templateId
  );
  if (!currentTemplate) {
    return <Box>No template found for {design.id}</Box>;
  }

  const realWidth = productConfig.widthPx;
  const realHeight = productConfig.heightPx;

  const sideConfig = side === 'back' ? currentTemplate.back : currentTemplate.front;
  if (!sideConfig) {
    return <Box>No {side} side found in template</Box>;
  }

  const outerRef = useRef(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  const measureAndComputeScale = useCallback(() => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const parentW = rect.width;
    const parentH = rect.height;

    let newScale = Math.min(parentW / realWidth, parentH / realHeight);
    if (newScale > 1) {
      newScale = 1;
    }
    setScaleFactor(newScale);
  }, [realWidth, realHeight]);

  useEffect(() => {
    measureAndComputeScale();
    window.addEventListener('resize', measureAndComputeScale);
    return () => {
      window.removeEventListener('resize', measureAndComputeScale);
    };
  }, [measureAndComputeScale]);

  const bgUrl = side === 'back' ? design.backImage : design.frontImage;

  const renderOverlays = (overlays) => {
    if (!overlays || !overlays.length) return null;
    return overlays.map((ov, index) => (
      <Box
        key={`overlay-${index}`}
        component="img"
        src={ov.src}
        alt={`overlay-${index}`}
        sx={{
          position: 'absolute',
          top: ov.y,
          left: ov.x,
          width: ov.width,
          height: ov.height,
          objectFit: 'cover',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
    ));
  };

  return (
    <Box
      ref={outerRef}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${realWidth}px`,
          height: `${realHeight}px`,
          transform: `translate(-50%, -50%) scale(${scaleFactor})`,
          transformOrigin: 'center center',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {renderTemplateElements({
          elements: sideConfig.elements,
          userData,
          scaleFactor: 1,
        })}
        {side === 'front' && design.front?.overlays && renderOverlays(design.front.overlays)}
        {side === 'back' && design.back?.overlays && renderOverlays(design.back.overlays)}
      </Box>
    </Box>
  );
}
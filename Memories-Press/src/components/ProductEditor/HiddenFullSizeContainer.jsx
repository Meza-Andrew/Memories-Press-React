import React from 'react';
import { Box } from '@mui/material';
import { renderTemplateElements } from './RenderTemplateElements';

export default function HiddenFullSizeContainers({
  frontRef,
  backRef,
  productConfig,
  design,
  userData,
}) {
  if (!design || !productConfig) return null;

  const currentTemplate = productConfig.templates.find(t => t.id === design.templateId);
  if (!currentTemplate) return null;

  const { widthPx, heightPx } = productConfig;

  const renderDesignOverlays = (overlays) => {
    if (!overlays || !overlays.length) return null;
    return overlays.map((overlay, index) => (
      <Box
        key={`overlay-${index}`}
        component="img"
        src={overlay.src}
        alt={`overlay-${index}`}
        sx={{
          position: 'absolute',
          top: overlay.y,
          left: overlay.x,
          width: overlay.width,
          height: overlay.height,
          objectFit: 'contain',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />
    ));
  };

  return (
    <>
      <Box
        ref={frontRef}
        sx={{
          position: 'absolute',
          top: '-2000px',
          left: '-2000px',
          width: `${widthPx}px`,
          height: `${heightPx}px`,
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}
      >
        <img
          src={design.frontImage}
          alt="Front"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
          {currentTemplate.front &&
          renderTemplateElements({
            elements: currentTemplate.front.elements,
            userData,
            scaleFactor: 1,
          })}

        {design.front?.overlays && renderDesignOverlays(design.front.overlays)}
      </Box>

      {currentTemplate.back && (
        <Box
          ref={backRef}
          sx={{
            position: 'absolute',
            top: '-4000px',
            left: '-4000px',
            width: `${widthPx}px`,
            height: `${heightPx}px`,
            backgroundColor: '#eee',
            overflow: 'hidden',
          }}
        >
          <img
            src={design.backImage}
            alt="Back"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
            {currentTemplate.back &&
            renderTemplateElements({
              elements: currentTemplate.back.elements,
              userData,
              scaleFactor: 1,
            })}
          {design.back?.overlays && renderDesignOverlays(design.back.overlays)}
        </Box>
      )}
    </>
  );
}
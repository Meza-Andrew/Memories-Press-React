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

  const { widthPx, heightPx, bleedWidthPx, bleedHeightPx } = productConfig;
  const widthOffset = (bleedWidthPx - widthPx) / 2;
  const heightOffset = (bleedHeightPx - heightPx) / 2;

  const offset = { widthOffset, heightOffset };

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
          top: overlay.y + offset.heightOffset,
          left: overlay.x + offset.widthOffset,
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
          width: `${bleedWidthPx}px`,
          height: `${bleedHeightPx}px`,
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}
      >
        <img
          src={design.frontImageBleed}
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
            design,
            scaleFactor: 1,
            offset,
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
            width: `${bleedWidthPx}px`,
            height: `${bleedHeightPx}px`,
            backgroundColor: '#eee',
            overflow: 'hidden',
          }}
        >
          <img
            src={design.backImageBleed}
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
              design,
              scaleFactor: 1,
              offset,
            })}
          {design.back?.overlays && renderDesignOverlays(design.back.overlays)}
        </Box>
      )}
    </>
  );
}

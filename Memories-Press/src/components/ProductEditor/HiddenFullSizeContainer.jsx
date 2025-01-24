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
        }}
      >
        <img
          src={design.frontImage}
          alt="Front"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {renderTemplateElements && currentTemplate.front && (
          renderTemplateElements({
            elements: currentTemplate.front.elements,
            userData,
            scaleFactor: 1,
          })
        )}
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
          }}
        >
          <img
            src={design.backImage}
            alt="Back"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {renderTemplateElements && currentTemplate.back && (
            renderTemplateElements({
              elements: currentTemplate.back.elements,
              userData,
              scaleFactor: 1,
            })
          )}
        </Box>
      )}
    </>
  );
}
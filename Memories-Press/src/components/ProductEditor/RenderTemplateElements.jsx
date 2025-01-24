import React from 'react';
import { Box, Typography } from '@mui/material';

export function renderTemplateElements({ elements, userData, scaleFactor = 1 }) {
  if (!elements) return null;

  return Object.keys(elements).map((key) => {
    const elem = elements[key];
    if (!elem) return null;

    if (elem.hasPhoto && userData.photo) {
      return (
        <Box
          key={key}
          component="img"
          src={userData.photo}
          alt="User Photo"
          sx={{
            position: 'absolute',
            top: elem.y * scaleFactor,
            left: elem.x * scaleFactor,
            width: elem.width * scaleFactor,
            height: elem.height * scaleFactor,
            objectFit: 'cover',
            borderRadius: elem.borderRadius || '0%',
          }}
        />
      );
    }

    if (elem.hasText) {
      let textValue = userData[key] || '';
      if (key === 'proverb' && userData.proverb === 'CUSTOM') {
        textValue = userData.customProverb;
      }
      if (!textValue) return null;

      const fontSizeNum = parseInt(elem.font.size, 10) || 16;
      const scaledFontSize = Math.round(fontSizeNum * scaleFactor);

      return (
        <Typography
          key={key}
          sx={{
            position: 'absolute',
            top: elem.y * scaleFactor,
            left: elem.x * scaleFactor,
            width: elem.width * scaleFactor,
            fontFamily: elem.font.family || 'Arial',
            fontWeight: elem.font.weight || 'normal',
            fontStyle: elem.font.italic ? 'italic' : 'normal',
            fontSize: `${scaledFontSize}px`,
            color: elem.font.color || '#000',
            textAlign: 'center',
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px',
          }}
        >
          {textValue}
        </Typography>
      );
    }
    return null;
  });
}
import React from 'react';
import { Box, Typography } from '@mui/material';
import FadeInBox from '../FadeInBox';

export function renderTemplateElements({
  elements,
  userData,
  design,
  scaleFactor = 1,
  offset = { widthOffset: 0, heightOffset: 0 }
}) {
  const fontSizeMultiplier = 4;
  if (!elements) return null;

  const displayUserData = {
    ...userData,
    fullName: userData.lastName
      ? `${userData.name} ${userData.lastName}`.trim()
      : userData.name,
  };

  return Object.keys(elements).map((key) => {
    const elem = elements[key];
    if (!elem) return null;

    if (elem.hasPhoto && displayUserData.photo) {
      return (
        <Box
          key={key}
          sx={{
            position: 'absolute',
            top: `${(elem.y + offset.heightOffset) * scaleFactor}px`,
            left: `${(elem.x + offset.widthOffset) * scaleFactor}px`,
            width: `${elem.width * scaleFactor}px`,
            height: `${elem.height * scaleFactor}px`,
            borderRadius: elem.borderRadius || '0%',
            overflow: 'hidden',
            ...(design.borderColor
              ? { border: `10px solid ${design.borderColor}` }
              : {
                  WebkitMaskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                  maskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                }),
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${displayUserData.photo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </Box>
      );
    }

    if (elem.hasText) {
      let textValue = '';
      let overrideFontSize;
      let overrideFontSizeAlt;
      if (key === 'name') {
        textValue = displayUserData.fullName;
      } else if (key === 'proverb') {
        if (displayUserData.proverb === 'CUSTOM') {
          textValue = displayUserData.customProverb || '';
        } else {
          let pObj = null;
          if (typeof displayUserData.proverb === 'object' && displayUserData.proverb !== null) {
            pObj = displayUserData.proverb;
          } else if (typeof displayUserData.proverb === 'string') {
            try {
              pObj = JSON.parse(displayUserData.proverb);
            } catch (err) {
              textValue = displayUserData.proverb;
            }
          }
          if (pObj) {
            textValue = pObj.text || '';
            if (pObj.fontSize) {
              overrideFontSize = parseInt(pObj.fontSize, 10);
            }
            if (pObj.fontSizeAlt) {
              overrideFontSizeAlt = parseInt(pObj.fontSizeAlt, 10);
            }
          }
        }
        if (typeof textValue === 'object' && textValue !== null) {
          textValue = textValue.text ? String(textValue.text) : '';
        }
      } else {
        textValue = displayUserData[key] || '';
      }
      textValue = typeof textValue === 'string' ? textValue : '';

      if (!textValue) return null;

      let computedFontSize, fontFamily, fontWeight, fontStyle, fontColor;
      let transformStyle = '';
      let transformOrigin = '';

      if (key === 'name') {
        const fontSource = userData.selectedFont === 'font1' ? design.font : design.fontAlt;
        const fontSizeNum = parseInt(fontSource.size, 10) || 16;
        computedFontSize = Math.round(fontSizeNum * fontSizeMultiplier * scaleFactor);
        fontFamily = fontSource.family || 'Arial';
        fontWeight = fontSource.weight || 'normal';
        fontStyle = fontSource.italic ? 'italic' : 'normal';
        fontColor = fontSource.color || '#000';

        const allowedWidth = userData.name.width || (elem.width * scaleFactor);
        const estimatedWidth = computedFontSize * 0.5 * textValue.length;
        const textScale = estimatedWidth > allowedWidth ? allowedWidth / estimatedWidth : 1;
        transformStyle = `scale(${textScale})`;
        transformOrigin = 'center bottom';
      } else if (key === 'proverb') {
        const fontSource = userData.selectedFontBack === 'font1' ? elem.font : elem.fontAlt;
        const fontFamilyWeightStyle = userData.selectedFontBack === 'font1' ? design.prayerFont : design.prayerFontAlt;
        const fontSizeNum =
          overrideFontSize !== undefined ? overrideFontSize : (parseInt(fontSource.size, 10) || 16);
        const fontSizeNumAlt =
          overrideFontSizeAlt !== undefined ? overrideFontSizeAlt : (parseInt(fontSource.size, 10) || 16);
        const fontSizeNumTrue = userData.selectedFontBack === 'font1' ? fontSizeNum : fontSizeNumAlt;
        computedFontSize = Math.round(fontSizeNumTrue * fontSizeMultiplier * scaleFactor);
        fontFamily = fontFamilyWeightStyle.family || 'Arial';
        fontWeight = fontFamilyWeightStyle.weight || 'normal';
        fontStyle = fontFamilyWeightStyle.italic ? 'italic' : 'normal';
        fontColor = fontSource.color || '#000';
      } else {
        const fontSizeNum = parseInt(elem.font.size, 10) || 16;
        computedFontSize = Math.round(fontSizeNum * fontSizeMultiplier * scaleFactor);
        fontFamily = elem.font.family || 'Arial';
        fontWeight = elem.font.weight || 'normal';
        fontStyle = elem.font.italic ? 'italic' : 'normal';
        fontColor = elem.font.color || '#000';
      }

      if (key === 'lastName') return null;

      return (
        <Box
          key={key}
          sx={{
            position: 'absolute',
            top: `${(elem.y + offset.heightOffset) * scaleFactor}px`,
            left: `${(elem.x + offset.widthOffset) * scaleFactor}px`,
            width: `${elem.width * scaleFactor}px`,
            overflow: 'visible',
          }}
        >
          <Typography
            sx={{
              fontFamily,
              fontWeight,
              fontStyle,
              fontSize: `${computedFontSize}px`,
              color: fontColor,
              textAlign: 'center',
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: key === 'name' ? 'nowrap' : 'pre-wrap',
              overflow: 'visible',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent:
                key === 'name'
                  ? 'center'
                  : key === 'dob'
                  ? 'right'
                  : key === 'dod'
                  ? 'left'
                  : 'center',
              padding: '0px',
              lineHeight: 1.1,
              transform: transformStyle,
              transformOrigin,
            }}
          >
            {textValue}
            {key === 'dob' ? ' -' : ''}
          </Typography>
        </Box>
      );
    }

    return null;
  });
}
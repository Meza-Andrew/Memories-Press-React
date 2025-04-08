import React from 'react';
import { Box, Typography } from '@mui/material';
import FadeInBox from '../FadeInBox';
import { PRODUCT_TYPES } from './templatesConfig';

export function renderTemplateElements({
  elements,
  userData,
  design,
  scaleFactor = 1,
  productType,
  offset = { widthOffset: 0, heightOffset: 0 }
}) {
  let customProverbOffset;

  if (productType === PRODUCT_TYPES.PRAYER_CARD) {
    customProverbOffset = 470;
  } else if (productType === PRODUCT_TYPES.BOOKMARK) {
    customProverbOffset = 900;
  }
  //fix for mobile view @ecdevguy

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
      let overrideLineHeight;
      let overrideLineHeightAlt;
      let fontAlignment;
      if (key === 'name') {
        textValue = displayUserData.fullName;
      } else if (key === 'proverb') {
        if (displayUserData.proverb === 'CUSTOM') {
          textValue = displayUserData.customProverb || '';
        } else {
          let pObj = null;
          if (typeof displayUserData.proverb === 'object' && displayUserData.proverb !== null) {
            pObj = displayUserData.proverb;
            fontAlignment = pObj.textAlignment || 'center';
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
              overrideFontSize = pObj.fontSize;
            }
            if (pObj.lineHeight) {
              overrideLineHeight = pObj.lineHeight, 10 || 1;
            }
            if (pObj.fontSizeAlt) {
              overrideFontSizeAlt = pObj.fontSizeAlt;
            }
            if (pObj.lineHeightAlt) {
              overrideLineHeightAlt = pObj.lineHeightAlt || 1;
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

      let computedFontSize, fontFamily, fontWeight, fontStyle, fontColor, fontLineHeight;
      let transformStyle = '';
      let transformOrigin = 'center center';

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
      } else if (key === 'proverb') {
        const fontSource = userData.selectedFontBack === 'font1' ? elem.font : elem.fontAlt;
        const fontFamilyWeightStyle = userData.selectedFontBack === 'font1' ? design.prayerFont : design.prayerFontAlt;
        const fontSizeNum = overrideFontSize !== undefined ? overrideFontSize : (parseInt(fontSource.size, 10) || 16);
        const fontSizeNumAlt = overrideFontSizeAlt !== undefined ? overrideFontSizeAlt : (parseInt(fontSource.size, 10) || 16);
        const fontSizeNumTrue = userData.selectedFontBack === 'font1' ? fontSizeNum : fontSizeNumAlt;
        fontLineHeight = userData.selectedFontBack === 'font1' ? overrideLineHeight : overrideLineHeightAlt;
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
      if (key === 'proverb' && userData.proverb === 'CUSTOM') {
        const textLength = textValue.length;
        let computedLineHeight;
        let computedFontSizeCustom = 11;
        if (textLength <= 30) {
          computedLineHeight = 2.4;
          computedFontSizeCustom = 14;
        } else if (textLength <= 60) {
          computedLineHeight = 2.3;
          computedFontSizeCustom = 13.75;
        } else if (textLength <= 90) {
          computedLineHeight = 2.3;
          computedFontSizeCustom = 13.5;
        } else if (textLength <= 120) {
          computedLineHeight = 2.3;
          computedFontSizeCustom = 13.25;
        } else if (textLength <= 150) {
          computedLineHeight = 2.2;
          computedFontSizeCustom = 13;
        } else if (textLength <= 180) {
          computedLineHeight = 2.1;
          computedFontSizeCustom = 12.75;
        } else if (textLength <= 210) {
          computedLineHeight = 2;
          computedFontSizeCustom = 12.5;
        } else if (textLength <= 240) {
          computedLineHeight = 1.9;
          computedFontSizeCustom = 12.25;
        } else if (textLength <= 270) {
          computedLineHeight = 1.8;
          computedFontSizeCustom = 12;
        } else if (textLength <= 300) {
          computedLineHeight = 1.7;
          computedFontSizeCustom = 11.75;
        } else if (textLength <= 330) {
          computedLineHeight = 1.6;
          computedFontSizeCustom = 11.5;
        } else if (textLength <= 360) {
          computedLineHeight = 1.5;
          computedFontSizeCustom = 11.25;
        } else if (textLength <= 390) {
          computedLineHeight = 1.4;
          computedFontSizeCustom = 11;
        } else if (textLength <= 420) {
          computedLineHeight = 1.3;
          computedFontSizeCustom = 11;
        } else if (textLength <= 450) {
          computedLineHeight = 1.2;
          computedFontSizeCustom = 11;
        } else if (textLength <= 480) {
          computedLineHeight = 1.1;
          computedFontSizeCustom = 11;
        } else {
          computedLineHeight = 1;
          computedFontSizeCustom = 11;
        }
        return (
          <Box
            key={key}
            sx={{
              position: 'absolute',
              top: `${((elem.y + customProverbOffset) + offset.heightOffset) * scaleFactor}px`,
              left: `${(elem.x + offset.widthOffset) * scaleFactor}px`,
              width: `${elem.width * scaleFactor}px`,
              height: `${elem.height * scaleFactor}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FadeInBox>
              <Typography
                sx={{
                  fontFamily,
                  fontWeight,
                  fontStyle,
                  fontSize: `${((userData.selectedFontBack === 'font1' ? computedFontSizeCustom : computedFontSizeCustom - 3) * fontSizeMultiplier)}px`,
                  color: fontColor,
                  textAlign: 'center',
                  wordWrap: 'break-word',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  overflow: 'visible',
                  lineHeight: userData.selectedFontBack === 'font1' ? computedLineHeight + (productType === PRODUCT_TYPES.BOOKMARK ? 1 : 0) : computedLineHeight + (productType === PRODUCT_TYPES.BOOKMARK ? 2 : 0.5),
                  transform: transformStyle,
                }}
              >
                {textValue}
              </Typography>
            </FadeInBox>
          </Box>
        );
      }
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
        ><FadeInBox direction={key === 'proverb' ? 'down' : 'up'}>
          <Typography
            sx={{
              fontFamily,
              fontWeight,
              fontStyle,
              fontSize: `${computedFontSize}px`,
              color: fontColor,
              textAlign: fontAlignment,
              wordWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: key === 'name' ? 'nowrap' : 'pre-wrap',
              overflow: 'visible',
              display: 'flex',
              alignItems: 'center',
              justifyContent:
                key === 'name'
                  ? 'center'
                  : key === 'dob'
                  ? 'right'
                  : key === 'dod'
                  ? 'left'
                  : 'center',
              padding: '0px',
              lineHeight: fontLineHeight,
              transform: transformStyle,
              transformOrigin,
            }}
          >
            {textValue}
            {key === 'dob' ? ' -' : ''}
          </Typography>
          </FadeInBox>
        </Box>
      );
    }

    return null;
  });
}
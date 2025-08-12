import { Box, Typography } from '@mui/material';
import AutoFitProverb from './AutoFitProverb';

export function renderTemplateElements({
  elements, // template!
  userData,
  design,
  scaleFactor = 1,
  productType,
  offset = { widthOffset: 0, heightOffset: 0 }
}) {

  const imgFade = design.borderColor === 'fade' ? false : design.borderColor;

  const fontSizeMultiplier = 4;
  if (!elements) return null;

  const displayUserData = {
    ...userData,
    fullName: userData.lastName
      ? `${userData.name} ${userData.lastName}`.trim()
      : userData.name,
    dates: userData.dod
      ? `${userData.dob} - ${userData.dod}`.trim()
      : userData.dob,
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
            width: `${(elem.width * scaleFactor)}px`,
            height: `${elem.height * scaleFactor}px`,
            borderRadius: elem.borderRadius || '0%',
            overflow: 'hidden',
            ...(imgFade
              ? { border: `10px solid ${design.borderColor}` }
              : {
                  WebkitMaskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 70%)',
                  maskImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 70%)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
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
      } else if (key === 'dob') {
        textValue = displayUserData.dates;
      }
      else if (key === 'proverb') {
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
      
      if (key === 'name') {
        const fontSource = userData.selectedFont === 'font1' ? design.nameFont : design.nameFontAlt;
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
      } 
      else if (key === 'proverb') {
        const fontFamilyWeightStyle = userData.selectedFontBack === 'font1' ? design.prayerFont : design.prayerFontAlt;
        const fontSizeNum = overrideFontSize !== undefined ? overrideFontSize : (parseInt(fontFamilyWeightStyle.size, 10) || 16);
        const fontSizeNumAlt = overrideFontSizeAlt !== undefined ? overrideFontSizeAlt : (parseInt(fontFamilyWeightStyle.size, 10) || 16);
        const fontSizeNumTrue = userData.selectedFontBack === 'font1' ? fontSizeNum : fontSizeNumAlt;

        fontLineHeight = userData.selectedFontBack === 'font1' ? overrideLineHeight : overrideLineHeightAlt;
        computedFontSize = Math.round(fontSizeNumTrue * fontSizeMultiplier * scaleFactor);
        fontFamily = fontFamilyWeightStyle.family || 'Arial';
        fontWeight = fontFamilyWeightStyle.weight || 'normal';
        fontStyle = fontFamilyWeightStyle.italic ? 'italic' : 'normal';
        fontColor = fontFamilyWeightStyle.color || '#000';
      } 
      else if (key === 'dates') {
        // --- Date font toggle logic ---
        // const fontSource = userData.selectedFont === 'font1' ? design.dateFont : design.dateFontAlt;
        // const fontSizeNum = parseInt(userData.selectedFont === 'font1' ? design.dateFont.size : design.dateFontAlt.size, 10) || 16;
        // date font no toggle, uses dateFont
        const fontSource = design.dateFont;
        const fontSizeNum = parseInt(design.dateFont.size, 10) || 16;
        computedFontSize = Math.round(fontSizeNum * fontSizeMultiplier * scaleFactor);
        
        fontFamily = fontSource.family || 'Arial';
        fontWeight = fontSource.weight || 'normal';
        fontStyle = fontSource.italic ? 'italic' : 'normal';
        fontColor = fontSource.color || '#000';
      }   
      if (key === 'proverb') {
        const isCustomProverb = displayUserData.proverb === 'CUSTOM';
        return (
          <AutoFitProverb
            key={key}
            elem={elem}
            offset={offset}
            scaleFactor={scaleFactor}
            productType={productType}
            text={textValue}
            fontFamily={fontFamily}
            fontWeight={fontWeight}
            fontStyle={fontStyle}
            fontColor={fontColor}
            textAlign={fontAlignment}
            isCustomPrayer={isCustomProverb}
          />
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
          height: `${elem.height * scaleFactor}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
                lineHeight: 1,
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                whiteSpace: key === 'name' ? 'nowrap' : 'pre-wrap',
                overflow: 'visible',
                transform: transformStyle,
                transformOrigin: 'center',
              }}
            >
              {textValue}
            </Typography>
        </Box>
      );
    }
    return null;
  });
}
import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function AutoFitProverb({
  elem,
  offset,
  productType,
  text,
  fontFamily,
  fontWeight,
  fontStyle,
  fontColor,
  textAlign = 'center',
  isCustomPrayer = false,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(32);
  const [lineHeight, setLineHeight] = useState(1);

  const maxFontSize = 60;
  const minFontSize = 20;

  useEffect(() => {
    const resizeText = () => {
      if (!containerRef.current || !textRef.current) return;
      const container = containerRef.current;
      const textEl = textRef.current;
      const isBookmark = !isCustomPrayer && productType === 'BOOKMARK';
      const presetBump = isBookmark ? .75 : 1;

      if (isCustomPrayer) {
        let currentSize = maxFontSize;
        textEl.style.fontSize = `${currentSize}px`;
        textEl.style.lineHeight = '1';
        while (
          (textEl.scrollWidth > container.clientWidth ||
           textEl.scrollHeight > container.clientHeight) &&
          currentSize > minFontSize
        ) {
          currentSize -= 1;
          textEl.style.fontSize = `${currentSize}px`;
          textEl.style.lineHeight = '1';
        }
        setFontSize(currentSize);
        const lines = textEl.scrollHeight / currentSize;
        const idealLH = container.clientHeight / (currentSize * lines);
        const newLH = Math.min(idealLH, 2);
        setLineHeight(newLH);
        textEl.style.lineHeight = newLH.toString();
      } else {
        const lines = (text.match(/\n/g) || []).length + 1;
        let currentSize = maxFontSize;
        textEl.style.fontSize = `${currentSize}px`;
        textEl.style.lineHeight = '1';
        while (
          (textEl.scrollWidth > container.clientWidth ||
           currentSize * lines > container.clientHeight) &&
          currentSize > minFontSize
        ) {
          currentSize -= 1;
          textEl.style.fontSize = `${currentSize}px`;
        }
        setFontSize(currentSize);
        const baseLH = container.clientHeight / (currentSize * lines);
        const bumpedLH = baseLH * presetBump;
        setLineHeight(bumpedLH);
        textEl.style.lineHeight = bumpedLH.toString();
      }
    };
    resizeText();
  }, [text, fontFamily, fontWeight, fontStyle, productType, isCustomPrayer]);

  const commonTypography = {
    ref: textRef,
    sx: {
      fontSize: `${fontSize}px`, 
      fontFamily,
      fontWeight,
      fontStyle,
      color: fontColor,
      textAlign,
      overflow: 'hidden',
      width: '100%',
    },
  };

  const presetProps = {
    ...commonTypography,
    sx: {
      ...commonTypography.sx,
      whiteSpace: 'pre',
      wordBreak: 'keep-all',
      lineHeight,
    },
  };

  const customProps = {
    ...commonTypography,
    sx: {
      ...commonTypography.sx,
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word',
      wordBreak: 'break-word',
      lineHeight,
    },
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: `${elem.y + offset.heightOffset}px`, 
        left: `${elem.x + offset.widthOffset}px`, 
        width: `${elem.width}px`, 
        height: `${elem.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {isCustomPrayer ? (
        <Typography {...customProps}>{text}</Typography>
      ) : (
        <Typography {...presetProps}>{text}</Typography>
      )}
    </Box>
  );
}
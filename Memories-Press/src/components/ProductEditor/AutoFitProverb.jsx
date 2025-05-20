import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FadeInBox from '../FadeInBox';

export default function AutoFitProverb({
  elem,
  offset,
  productType,
  text,
  fontFamily,
  fontWeight,
  fontStyle,
  fontColor,
  textAlign = 'center'
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(32);
  const [lineHeight, setLineHeight] = useState(1.2);

  const maxFontSize = 60;
  const minFontSize = 20;
  // const customProverbOffset = productType === 'prayer_card' ? 0 : 900;

  useEffect(() => {
    const resizeText = () => {
      if (!containerRef.current || !textRef.current) return;

      const container = containerRef.current;
      const lines = (text.match(/\n/g) || []).length + 1;
      const containerHeight = container.clientHeight;

      let currentSize = maxFontSize;
      textRef.current.style.fontSize = `${currentSize}px`;

      while (
        (textRef.current.scrollWidth > container.clientWidth ||
         currentSize * lines > containerHeight) &&
        currentSize > minFontSize
      ) {
        currentSize -= 1;
        textRef.current.style.fontSize = `${currentSize}px`;
      }

      setFontSize(currentSize);

      const idealLineHeight = containerHeight / (currentSize * lines);
      setLineHeight(Math.min(idealLineHeight, 2));
    };

    resizeText();
  }, [text, fontFamily, fontWeight, fontStyle, productType]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        top: `${(elem.y + offset.heightOffset)}px`,
        left: `${(elem.x + offset.widthOffset)}px`,
        width: `${elem.width}px`,
        height: `${elem.height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
        <Typography
          ref={textRef}
          sx={{
            fontSize: `${fontSize}px`,
            fontFamily,
            fontWeight,
            fontStyle,
            color: fontColor,
            textAlign,
            whiteSpace: 'pre',
            wordBreak: 'keep-all',
            lineHeight,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {text}
        </Typography>
    </Box>
  );
}
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box } from '@mui/material';

const FadeInBox = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.6,
  easing = 'ease',
  threshold = 0.2,
  triggerOnce = true,
}) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const directionMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0, 0)' : directionMap[direction],
        transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInBox;
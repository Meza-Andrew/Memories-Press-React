import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { darken } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)(({ theme, ownerState }) => {
  const { width, color, backgroundColor } = ownerState;

  return {
    backgroundColor: backgroundColor || '#c95d64',
    color: color || 'white',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: 19,
    width: width || 'auto',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: backgroundColor
        ? darken(backgroundColor, 0.2)
        : darken('#c95d64', 0.2),
    },
  };
});

export default function StyledButton({
  children,
  width,
  color,
  backgroundColor,
  path,
  onClick,
  ...props
}) {
  const navigate = useNavigate();


  const handleClick = () => {
    if (path) {
      navigate(path);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <CustomButton
      {...props}
      ownerState={{ width, color, backgroundColor }}
      onClick={handleClick}
    >
      {children}
    </CustomButton>
  );
}

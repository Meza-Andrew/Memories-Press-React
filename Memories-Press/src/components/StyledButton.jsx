import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { darken } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomButton = styled(Button)(({ theme, ownerState }) => {
  const { width, longButton, small, color, backgroundColor } = ownerState;

  return {
    backgroundColor: backgroundColor || '#D3648B',
    color: color || '#FCF46D',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: small ? 'clamp(1rem, 1vw, 1.2rem)' : 'clamp(1.2rem, 2vw, 1.8rem)',
    width: width || 'auto',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(longButton ? 12 : 3),
    paddingLeft: theme.spacing(longButton ? 12 : 3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: backgroundColor
        ? darken(backgroundColor, 0.1)
        : darken('#D3648B', 0.1),
      boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.3)',
    },
  };
});

export default function StyledButton({
  children,
  width,
  color,
  backgroundColor,
  path,
  longButton,
  small,
  onClick,
  ...props
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    } else if (onClick) {
      onClick();
    }
  };
  

  return (
    <CustomButton
      {...props}
      ownerState={{ width, color, backgroundColor, longButton, small }}
      onClick={handleClick}
    >
      {children}
    </CustomButton>
  );
}
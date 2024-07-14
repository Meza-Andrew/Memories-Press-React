import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Container, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const AuthInterface = () => {
    const [alwaysShowLogin, setAlwaysShowLogin] = useState(false);

    const handleCheckboxChange = (event) => {
        setAlwaysShowLogin(event.target.checked);
    };

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container 
        maxWidth="lg" 
        sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: isMobile ? 'center' : 'left', 
          gap: 0,
        }}
        >
            <Button component={RouterLink} to="/signup" variant="contained" color="primary" size="large" style={{ margin: '10px' }}>
                Sign Up
            </Button>
            <Button component={RouterLink} to="/signin" variant="contained" color="secondary" size="large" style={{ margin: '10px' }}>
                Log In
            </Button>
            <Button component={RouterLink} to="/signinsignup" variant="contained" color="success" size="large" style={{ margin: '10px' }}>
                Both
            </Button>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={alwaysShowLogin}
                        onChange={handleCheckboxChange}
                        color="primary"
                    />
                }
                label="Always show login"
            />
        </Container>
    );
};

export default AuthInterface;

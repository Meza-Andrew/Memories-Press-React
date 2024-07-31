import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/logoPrinting.png';
import logoText from '../assets/logo.png';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import { Badge, Divider } from '@mui/material';
import CartContext from './CartContext';


const pages = ['Funeral Stationary', 'Resources', 'About'];
const settings = ['View Orders', 'Update Info', 'Change Password', 'Logout'];

function NavBar({isLoggedIn, setUser}) {

  const { cartItems, removeFromCart } = React.useContext(CartContext);
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserLogin = () => {
    setUser((prevState) => !prevState);
  };

  const formatString = (str) => {
    return str.replace(/\s+/g, '').toLowerCase();
  };
  

  return (
    <>
      <AppBar component="nav" position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          {/* <img src={logo} alt="Logo" style={{ display: 'flex', marginRight: 4, height: '36px', width: '36px' }} /> */}
            <Link component={RouterLink} to='/' color='inherit' underline='none'>
  
                <img src={logoText} alt="Logo" style={{ display: 'flex', marginRight: 4, padding: 4, height: '80px', width: '213px' }} />

            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    component={RouterLink}
                    to={`/${formatString(page)}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2,  color: 'inherit' }}
                  >
                    {page}
                  </Button>
                ))}
                <Button variant="outline" component={RouterLink} to='funeralstationary/prayercardeditor'>Start your design</Button>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                size="large"
                aria-label="shopping cart"
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartSharpIcon />
                </Badge>
              </IconButton>
              {isLoggedIn &&  
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              }
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {!isLoggedIn &&
                  <MenuItem 
                    component={RouterLink}
                    to={"/signin"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Log In</Typography>
                  </MenuItem>
                }
                {!isLoggedIn && 
                  <MenuItem 
                    component={RouterLink}
                    to={"/signup"}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Sign Up</Typography>
                  </MenuItem>
                }
                {!isLoggedIn && <Divider/>}
                {pages.map((page) => (
                  <MenuItem 
                    key={page} 
                    component={RouterLink}
                    to={`/${formatString(page)}`}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                size="large"
                aria-label="shopping cart"
                color="inherit"
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartSharpIcon />
                </Badge>
              </IconButton>
              {isLoggedIn ? 
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Amy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              :
                <>
                  <Tooltip title="Login">
                    <Button component={RouterLink} sx={{ p: 0,  color: 'inherit' }} to="/signin">
                      <Typography>Login</Typography>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Sign Up">
                    <Button component={RouterLink} sx={{ p: 0,  color: 'inherit' }} to="/signup">
                      <Typography>Sign Up</Typography>
                    </Button>
                  </Tooltip>
                </>
              }
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting} 
                    component={RouterLink}
                    to={`/${formatString(setting)}`}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar sx={{marginBottom: 5}}/> {/* This Toolbar component adds padding to the main content below */}
    </>
  );
}

export default NavBar;

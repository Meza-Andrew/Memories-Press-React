import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Divider,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import logo from '../assets/logoPrinting.png';
import logoText from '../assets/logo.png';
import CartContext from './CartContext';


const pages = ['Funeral Stationary', 'Resources', 'About'];
const settings = ['View Orders', 'Update Info', 'Change Password', 'Logout'];

function NavBar({ isLoggedIn, setUser }) {
  const { cartItems } = React.useContext(CartContext);

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
        <Container maxWidth="100%">
          <Toolbar disableGutters>
            <Link component={RouterLink} to='/' color='inherit' underline='none'>
              <img src={logoText} alt="Logo" style={{ display: 'flex', marginRight: 4, padding: 6, height: 'auto', width: '155px' }} />
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {pages.map((page) => (
                  <>
                  <Button
                    key={page}
                    component={RouterLink}
                    to={`/${formatString(page)}`}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'inherit' }}
                  >
                    {page}
                  </Button>
                  <Divider orientation='vertical' flexItem variant="middle"/>
                  </>
                ))}
                
                
                {/* <Button variant="outline" component={RouterLink} to='funeralstationary/prayercardeditor'>Start your design</Button> */}
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                size="large"
                aria-label="shopping cart"
                color="inherit"
                sx={{marginRight: 0.5}}
              >
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartSharpIcon />
                </Badge>
              </IconButton>
              {isLoggedIn &&
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ 
                      p: 0,
                      marginRight: 0.5 
                    }}
                  >
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
                {!isLoggedIn && <Divider />}
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
                <MenuItem
                onClick={handleUserLogin} 
                sx={{ ml: 0, color: 'inherit' }}
                >
                  <Typography>{isLoggedIn ? 'Logout' : 'Login'}</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                component={RouterLink}
                to="/cart"
                size="large"
                aria-label="shopping cart"
                color="inherit"
                sx={{marginRight: 0.5}}
              >
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartSharpIcon />
                </Badge>
              </IconButton>
              {isLoggedIn ?
                <Tooltip title="Open settings">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ 
                      p: 0, 
                      marginRight: 0.5 
                    }}
                  >
                    <Avatar alt="Amy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                :
                <>
                  <Tooltip title="Login">
                    <Button component={RouterLink} sx={{ p: 0, color: 'inherit' }} to="/signin">
                      Login
                    </Button>
                  </Tooltip>
                  <Tooltip title="Sign Up">
                    <Button component={RouterLink} sx={{ p: 0, color: 'inherit' }} to="/signup">
                      Sign Up
                    </Button>
                  </Tooltip>
                </>
              }
              <Button onClick={handleUserLogin} sx={{ ml: 2, color: 'inherit' }}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
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
      <Toolbar sx={{ marginBottom: 0 }} />
    </>
  );
}

export default NavBar;

import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

const pages = ['Funeral Stationary', 'Resources', 'About'];
const settings = ['View Orders', 'Update Contact Info', 'Update Business Info', 'Update Payment Info', 'Change Password', 'Logout'];

function NavBar({isLoggedIn, setUser}) {
  
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton onClick={handleUserLogin}>
            <LocalFloristIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Memories Press
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={RouterLink}
                  to={`/${formatString(page)}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white' }}
                >
                  {page}
                </Button>
              ))}
              <Button variant="contained">Start your design</Button>
            </Box>
          </Box>

          

          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <IconButton
              size="large"
              aria-label="shopping cart"
              color="inherit"
            >
              <ShoppingCartSharpIcon />
            </IconButton>
            {
            isLoggedIn &&  
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
              size="large"
              aria-label="shopping cart"
              color="inherit"
            >
              <ShoppingCartSharpIcon />
            </IconButton>
            {
            isLoggedIn ? 
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Amy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            :
            <Tooltip title="Login or signup">
              <Button sx={{ p: 0, color: 'white' }}>
                Login/Signup
              </Button>
            </Tooltip>
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
                <MenuItem key={setting} component={RouterLink}
                to={`/${formatString(setting)}`}
                onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

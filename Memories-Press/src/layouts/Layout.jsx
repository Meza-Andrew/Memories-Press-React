import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box } from '@mui/material';

function Layout({isLoggedIn, setUser}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setUser={setUser}/>
      <Box sx={{
        maxWidth: 'xl', display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 'auto'
      }}>
      <Outlet />
      </Box>
      {/* <Footer/> */}
    </>
  )
}

export default Layout
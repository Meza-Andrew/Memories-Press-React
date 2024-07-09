import React from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({isLoggedIn, setUser}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setUser={setUser}/>
      <Outlet />
      <Footer/>
    </>
  )
}

export default Layout
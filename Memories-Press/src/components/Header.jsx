import React from 'react'
import NavBar from './NavBar'

function Header({isLoggedIn}) {
  return (
    <NavBar isLoggedIn={isLoggedIn}/>
  )
}

export default Header;
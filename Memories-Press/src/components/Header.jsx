import React from 'react'
import NavBar from './NavBar'

function Header({isLoggedIn, setUser}) {
  return (
    <NavBar isLoggedIn={isLoggedIn} setUser={setUser}/>
  )
}

export default Header;
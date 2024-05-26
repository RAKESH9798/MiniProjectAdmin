import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/nav_logo.svg'
import nav_profile from '../../assets/nav_profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_logo} alt="brand logo" className='nav-logo'/>
      <img src={nav_profile} alt="profile" className='nav-profile'/>
    </div>
  )
}

export default Navbar

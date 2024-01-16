import React from 'react'
import style from './navbar.module.scss'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  
  const {pathname} = useLocation();
  
  console.log(pathname)

  

  return (
    <ul className={style.navbar}>
      <li><Link to={'/'}>{pathname === '/' ? 'home이다' : 'home'}</Link></li>
      <li><Link to={'/profile'}>{pathname === '/profile' ? 'profile이다' : 'profile'}</Link></li>
    </ul>
  )
}
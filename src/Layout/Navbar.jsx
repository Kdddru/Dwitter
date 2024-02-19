import React from 'react'
import style from './style.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../server/server';


export default function Navbar({ isLogin }) {
  const { pathname } = useLocation();
  const navi = useNavigate();

  function logOut() {
    signOut(auth)
      .then(() => {
        navi('/login')
      })
  }

  return (
    <ul className={style.navbar}>
      <li><Link to={'/'}>{pathname === '/' ? 'home이다' : 'home'}</Link></li>
      <li><Link to={'/profile'}>{pathname === '/profile' ? 'profile이다' : 'profile'}</Link></li>
      <li><Link to={'/create-dweet'}>{pathname === '/create-dweet' ? 'create-dweet이다' : 'createDweet'}</Link></li>
      {
        isLogin ?
          <li className={style.logOut} onClick={logOut}>로그아웃</li> :
          <li className={style.logIn}><Link to={'/login'}>로그인</Link></li>
      }
    </ul>
  )
}

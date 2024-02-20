import React from 'react'
import style from './style.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { auth } from '../server/server';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';


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
      <li><Link to={'/'}>Dwitter</Link></li>
      <li>
        <Link to={'/profile'}><FontAwesomeIcon icon={pathname === '/profile' ? faUser : far.faUser} size='xl'/></Link>
      </li>
      <li><Link to={'/create-dweet'}><FontAwesomeIcon icon={faPenToSquare} size='xl'/></Link></li>
      {
        isLogin ?
          <li className={style.logOut} onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket} size='xl'/></li> :
          <li className={style.logIn}><Link to={'/login'}>로그인</Link></li>
      }
    </ul>
  )
}

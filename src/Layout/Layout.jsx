import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../server/server'


export default function Layout() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true)
      }
    })
  }, [])

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <Outlet />
    </div>
  )
}

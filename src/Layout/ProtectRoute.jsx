import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { auth } from '../server/server'
import { useNavigate } from 'react-router-dom'


export default function ProtectRoute({children}) {
  const navi = useNavigate();
  
  onAuthStateChanged(auth,(user)=>{
    if(!user){  
      navi('/login');
    }
  })

  return (
    <div>
      {children}
    </div>
  )
}

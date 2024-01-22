import React, { useState } from 'react'
import { auth } from '../server/server'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';


export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const {apiKey} = auth.config
  

  onAuthStateChanged(auth, (user)=>{
    if(user){
      setIsLogin(true);
    }
  })

  async function onClick(){
    await signOut(auth)
    .then(()=>{
      sessionStorage.removeItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
      setIsLogin(false)
    })
    .catch(()=>{
      alert('오류가 발생했습니다 다시 시도해주세요!')
    })
  }

  return (
    <div>
      <p style={{color:'white'}}>Home</p>
      {isLogin && <input type='button' value='로그아웃' onClick={onClick}/>}
      <br/>
      <Link to={'/login'}>LogIn</Link>
    </div>
  )
}



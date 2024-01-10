import React, { useState } from 'react'
import style from './style.module.scss'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../server/server';

export default function Login() {
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  function onChange(e){
    const {target :{value, name}} = e;
    if(name === 'email'){
      setEmail(value)
    }
    else if(name === 'password'){
      setPassword(value)
    }
  }

  async function onSubmit(e){
    e.preventDefault();

    if(email && password){
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
        
      }).catch(()=>{
        setError('이메일, 비밀번호를 확인해주세요');
      })
    }
    else{
      console.log('입력해달라!');
    }
  }


  return (
    <div className={style.login}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type='email'onChange={onChange} value={email} name='email' placeholder='이메일' required/>
        <input type='password'onChange={onChange} value={password} name='password'  placeholder='비밀번호' required/>
        <input type='submit' value='로그인'/>
      </form>
      <p className={style.error}>{error && error}</p>
    </div>
  )
}

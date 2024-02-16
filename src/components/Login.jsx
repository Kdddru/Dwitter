import React, { useState } from 'react'
import style from './style.module.scss'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../server/server';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navi = useNavigate();
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  
  function onChange(e){
    const {target :{value, name}} = e;
    if(name === 'email'){
      setEmail(value);
    }
    else if(name === 'password'){
      setPassword(value);
    }
  }

  async function onSubmit(e){
    e.preventDefault();

    if(email && password){
        await signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
          setError('')
          navi('/')
        }).catch(()=>{
          setError('이메일, 비밀번호를 확인해주세요');
        })
    }
  }




  return (
    <div className={style.login}>
      
      <h2>Login</h2>
      
      <form onSubmit={onSubmit}>
        <input type='email'onChange={onChange} value={email} name='email' placeholder='이메일' required/>
        <input type='password'onChange={onChange} value={password} name='password'  placeholder='비밀번호' required/>
        <input type='submit' value='Log In'/>
      </form>
      <p className={style.error}>{error && error}</p>

      <div className={style.create_account}>
        <Link to={'/create-account'}>회원가입</Link>
      </div>
      
    </div>
  )
}

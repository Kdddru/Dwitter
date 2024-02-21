import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../server/server';
import { useNavigate } from 'react-router-dom';




export default function CreateAccount() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("")
  const [errorMessage, setError] = useState('');

  const navi = useNavigate();


  function onChange(e) {
    const { target: { name, value } } = e;
    if (name === "name") {
      setUserName(value);
    }
    else if (name === "email") {
      setEmail(value);
    }
    else if (name === "password") {
      setPassword(value);
    }
    else if (name === "checkPassword") {
      setCheckPassword(value);
    }
  }


  async function onSubmit(e) {
    e.preventDefault();

    const check = password === checkPassword;

    if (userName && email && password && check) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: userName
          })
          navi('/');
        }).catch(() => {
          setError('존재하는 이메일입니다');
        })
    }
    else {
      setError('비밀번호를 확인해주세요');
    }

  }


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navi('/')
      }
    })
  },[])



  return (
    <div className={style.join}>
      <h2>Join D</h2>
      <form onSubmit={onSubmit}>
        <input placeholder='이름 또는 별명' onChange={onChange} value={userName} name='name' type='text' required={true} />
        <input placeholder='이메일' onChange={onChange} value={email} name='email' type='email' required={true} />
        <input placeholder='비밀번호' onChange={onChange} value={password} name='password' type='password' required={true} />
        <input placeholder='비밀번호 재확인' onChange={onChange} type='password' name='checkPassword' required={true} />
        <input type='submit' value='Create Account' />
      </form>
      <p className={style.error}>{errorMessage && errorMessage}</p>
    </div>
  )
}

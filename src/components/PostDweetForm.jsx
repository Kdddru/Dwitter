import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../server/server';

export default function PostDweetForm() {
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState();


  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUserInfo({
          name : user.displayName,
          email : user.email,
          uid : user.uid
        })
      }
    })
  },[])


  function onChange(e){
    setText(e.target.value);
  }
  
  function onChangeFile(e){
    const {files} = e.target

    setFile(...files);
  }

  function onSubmit(e){
    e.preventDefault();
  }

  console.log(userInfo)

  return (
    <div className={style.post}>
      <form> 
        <textarea name="textArea" onChange={onChange} value={text}/>
        <div className={style.file}>
          <label htmlFor='file'>
            <div>파일선택</div>
          </label>
          <input placeholder='첨부파일' value={file}  readOnly/>
        </div>
        <input type="file" id='file' onChange={onChangeFile} accept='image/png, image/jpeg' multiple />
        <input type='submit' value='post'/>
      </form>
    </div>
  )
}


import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../server/server';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function PostDweetForm() {
  const [text, setText] = useState();
  const [file, setFile] = useState();
  const [userInfo, setUserInfo] = useState();

  const navi = useNavigate();


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
    setFile([...files]);
  }
  
  file && file.map((f)=>console.log(f))
  
  async function onSubmit(e){
    e.preventDefault();
    if(userInfo && text.length > 0){
      try {
        const docRef = await addDoc(collection(db, "tweets"), {
          text : text,
          date : Date.now(),
          username : userInfo.name,
          useruid : userInfo.uid
        });

        if(file){
          const urls = await Promise.all(
            file.map(async(f)=>{
              const storageRef = ref(storage,`tweets/${userInfo.uid}/${docRef.id}`);
              const result = await uploadBytes(storageRef,f);
              const url = await getDownloadURL(result.ref);
              return url
            })
          )
          
          console.log(urls)
          await updateDoc(docRef,{
            photo : urls
          });
        }

        navi('/');
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }

  return (
    <div className={style.post}>
      <form onSubmit={onSubmit}> 
        <textarea name="textArea" onChange={onChange} value={text}/>
        <div className={style.file}>
          <label htmlFor='file'>
            <div>파일선택</div>
          </label>
          <input placeholder='첨부파일'  readOnly/>
        </div>
        <input type="file" id='file' onChange={onChangeFile} accept='image/png, image/jpeg' multiple />
        <input type='submit' value='post'/>
      </form>
    </div>
  )
}


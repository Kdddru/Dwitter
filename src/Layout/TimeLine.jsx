import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../server/server';
import style from './style.module.scss'
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';






function Tweets({text, date, username, useruid, photo, id}){
  const [userInfo, setUserInfo] = useState();

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setUserInfo({
          uid : user.uid
        })
      }
    })
  },[])

  async function onDelete(){
    if(!userInfo.uid || useruid !== userInfo.uid){
      return
    }
    const desertRef = ref(storage, `tweets/${useruid}/${id}`);
    await deleteObject(desertRef);
    await deleteDoc(doc(db, 'tweets', id));


  }

  return(
    <div className={style.tweets}>
      <div className={style.textbox}>
        {userInfo && <button onClick={onDelete}>X</button>}
        <p>{username}</p>
        <p>{text}</p>
      </div>
      {photo && <img src={photo[0]} alt="이미지" />}
    </div>
  )
}





export default function TimeLine() {
  const [tweets, setTweets] = useState();


  async function getData(){
    const q  = query(collection(db,'tweets'), orderBy("date","desc"), limit(3));
    const querySnapshot = await getDocs(q);
    
    const datas = querySnapshot.docs.map((doc)=>{
      const {text, date, username, useruid, photo} = doc.data();

      return{
        text,
        date,
        username,
        useruid,
        photo,
        id: doc.id
      }
    })
    setTweets(datas);

  }

  useEffect(()=>{
    getData();
  },[tweets])

  

  return (
    <div>
      {tweets && tweets.map((t)=>(
        <Tweets key={t.id} {...t} />
      ))}
    </div>
  )
}

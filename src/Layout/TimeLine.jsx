import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../server/server';
import style from './style.module.scss'






function Tweets({text, date, username, photo}){

  return(
    <div className={style.tweets}>
      <div className={style.textbox}>
        <p>{username}</p>
        <p>{text}</p>
      </div>
      <img src={photo[0]} alt="이미지" />
    </div>
  )
}





export default function TimeLine() {
  const [tweets, setTweets] = useState();


  async function getData(){
    const q  = query(collection(db,'tweets'));
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
  },[])

  return (
    <div>
      {tweets && tweets.map((t)=>(
        <Tweets key={t.id} {...t} />
      ))}
    </div>
  )
}

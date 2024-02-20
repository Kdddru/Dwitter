import { collection, deleteDoc, doc, getDocs, limit, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '../server/server';
import style from './style.module.scss'
import { onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';






export function Tweets(props) {
  const [userInfo, setUserInfo] = useState();

  const { text, username, useruid, photo, id } = props;
  const { getData } = props;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo({
          uid: user.uid
        })
      }
    })
  }, [])

  async function onDelete() {
    if (props) {
      if (!userInfo.uid || useruid !== userInfo.uid) {
        return
      }
      if (photo) {
        const desertRef = ref(storage, `tweets/${useruid}/${id}`);
        await deleteObject(desertRef);
      }
      await deleteDoc(doc(db, 'tweets', id));
      getData();
    }
  }

  return (
    <div className={style.tweets}>
      <div className={style.textbox}>
        <p>{username}</p>
        <p>{text}</p>
      </div>
      {photo && <img src={photo[0]} alt="이미지" />}
      {userInfo && id && userInfo.id === id && <button onClick={onDelete}>X</button>}
    </div>
  )
}





export default function TimeLine() {
  const [tweets, setTweets] = useState();


  async function getData() {
    const q = query(collection(db, 'tweets'), orderBy("date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);

    const datas = querySnapshot.docs.map((doc) => {
      const { text, date, username, useruid, photo } = doc.data();

      return {
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

  useEffect(() => {
    getData();
  }, []);



  return (
    <div style={{ marginTop: '100px' }}>
      {tweets && tweets.map((t) => (
        <Tweets key={t.id} {...t} getData={getData} />
      ))}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../server/server';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Tweets } from '../Layout/TimeLine';
import { collection, getDocs, query, where } from 'firebase/firestore';



function ProfileForm(props) {

  const { userUid, userName, userEmail, userPhoto } = props

  const [name, setName] = useState(userName);
  const [photo, setPhoto] = useState(userPhoto);

  //변경사항
  const [changeName, setChangeName] = useState();
  const [changePhoto, setChangePhoto] = useState();

  const navi = useNavigate();

  //displayname 변경
  function changeDisplayName(e) {
    setName(e.target.value);
    setChangeName(e.target.value);
  }

  //프로필 이미지 주소값 변경
  function changeImg(e) {
    const file = e.target.files[0];


    const reader = new FileReader();
    if (file) {
      setChangePhoto(file);
      reader.readAsDataURL(file);
      reader.onload = function () {
        setPhoto(reader.result)
      }
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const imagesRef = ref(storage, `profile/${userUid}`);

    //이름을 변경했을때
    if (changeName) {
      await updateProfile(auth.currentUser, {
        displayName: changeName
      }).then(() => {
        alert('변경되었습니다')
        navi('/');
      })
    }

    //프로필 사진을 바꿨을때
    if (changePhoto) {
      const result = await uploadBytes(imagesRef, changePhoto);
      const url = await getDownloadURL(result.ref);

      await updateProfile(auth.currentUser, {
        photoURL: url,
      }).then(() => {
        alert('변경되었습니다')
        navi('/');
      })
    }
  }

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <label htmlFor='file'>
        <img src={photo ? photo : userPhoto ? userPhoto : 'logo192.png'} alt="" width={200} height={200} />
      </label>
      <input type='file' id='file' accept='image/png, image/jpeg, image/jpg' onChange={changeImg} />
      <input type="text" value={name ? name : userName ? userName : ''} placeholder='이름' onChange={changeDisplayName} />
      <input type="text" value={userEmail ? userEmail : ''} placeholder='email' readOnly />
      <input type="submit" value="변경" />
    </form>
  )
}


function MyTweets(props) {

  const { userUid } = props;


  async function getTweets() {
    const tweetsRef = collection(db, 'tweets');
    const q = query(tweetsRef, where("useruid", '==', userUid));

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);
  };


  useEffect(() => {
    if (userUid) {
      getTweets();
    }
  }, [userUid])


  return (
    <div>
      <Tweets />
    </div>
  )
}


export default function Profile() {
  const [userInfo, setUserInfo] = useState();

  //로그인 정보 들고오기
  function getUser() {
    onAuthStateChanged(auth, (user) => {

      if (user) {
        setUserInfo({
          userUid: user.uid,
          userName: user.displayName,
          userEmail: user.email,
          userPhoto: user.photoURL
        })
      }
    })
  }


  useEffect(() => {
    getUser();
  }, [])



  return (
    <div className={style.profile}>
      <ProfileForm {...userInfo} />
      <MyTweets {...userInfo} />
    </div>
  )
}

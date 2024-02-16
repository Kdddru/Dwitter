import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, storage } from '../server/server';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';



// function ChangeProfileModal({photo,changeState}){
  


//   return(
//     <div className={style.changeProfileModal}>
//       <div>
//         <img src={photo ? photo : 'logo192.png'} alt="" width={250}/>
//         <ul>
//           <button>변경</button>
//           <button onClick={()=>changeState(false)}>취소</button>
//         </ul>
//       </div>
//     </div>
//   )
// }

export default function Profile() {
  const [userUid, setUserUid] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();
  const [changePhoto, setChangePhoto] = useState();
  //const [isModal, setIsModal] = useState();

  const navi = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // setUserInfo({
        //   name : user.displayName,
        //   email : user.email,
        //   photo : user.photoURL,
        // })
        setUserUid(user.uid)
        setName(user.displayName);
        setEmail(user.email);
        setPhoto(user.photoURL);
      }
    });
  },[])


  //프로필 사진 변경 모달 상태 변경
  // function ChangeIsmodal(bool){
  //   setIsModal(bool);
  // }

  function changeImg(e){
    const file = e.target.files[0];

    
    const reader = new FileReader();
    if(file){
      setChangePhoto(file);
      reader.readAsDataURL(file);
      reader.onload = function(){
        setPhoto(reader.result)
      }
    }
  }

  async function onSubmit(e){
    e.preventDefault();
    const imagesRef = ref(storage,`profile/${userUid}`);
    
    const result = await uploadBytes(imagesRef,changePhoto);
    const url = await getDownloadURL(result.ref);

    await updateProfile(auth.currentUser,{
      photoURL : url, displayName : name
    }).then(()=>{
      alert('변경되었습니다')
      navi('/');
    })



  }


  return (
    <div>
        <form className={style.profile} onSubmit={onSubmit}>
          <label htmlFor='file'>
            <img src={photo ? photo : 'logo192.png'} alt="" width={200} height={200}/>
          </label>
          <input type='file' id='file' accept='image/png, image/jpeg, image/jpg' onChange={changeImg}/>
          <input type="text" value={name ? name : ''} placeholder='이름' onChange={(e)=>{setName(e.target.value)}}/>
          <input type="text" value={email ? email : ''} placeholder='email'  onChange={(e)=>{setEmail(e.target.value)}} readOnly/>
          <input type="submit" value="변경" />
        </form>
      
      {/** 모달창 */}
      {/* { 
        isModal &&
        <ChangeProfileModal photo={photo} changeState={ChangeIsmodal}/>
      } */}
    </div>
  )
}

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

  //변경사항
  const [changeName, setChangeName] = useState();
  const [changePhoto, setChangePhoto] = useState();

  const navi = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid)
        setName(user.displayName);
        setEmail(user.email);
        setPhoto(user.photoURL);
      }
    });
  },[])

  function changeDisplayName(e){
    setName(e.target.value);
    setChangeName(e.target.value);
  }

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
    
    //이름을 변경했을때
    if(changeName){
      await updateProfile(auth.currentUser,{
        displayName : changeName
      }).then(()=>{
        alert('변경되었습니다')
        navi('/');
      })
    }

    //프로필 사진을 바꿨을때
    if(changePhoto){
      const result = await uploadBytes(imagesRef,changePhoto);
      const url = await getDownloadURL(result.ref);

      await updateProfile(auth.currentUser,{
        photoURL : url,
      }).then(()=>{
        alert('변경되었습니다')
        navi('/');
      })
    }
  }


  return (
    <div className={style.profile}>
        <form className={style.form} onSubmit={onSubmit}>
          <label htmlFor='file'>
            <img src={photo ? photo : 'logo192.png'} alt="" width={200} height={200}/>
          </label>
          <input type='file' id='file' accept='image/png, image/jpeg, image/jpg' onChange={changeImg}/>
          <input type="text" value={name ? name : ''} placeholder='이름' onChange={changeDisplayName}/>
          <input type="text" value={email ? email : ''} placeholder='email' readOnly/>
          <input type="submit" value="변경" />
        </form>
    </div>
  )
}

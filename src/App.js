import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import CreateAccount from './components/CreateAccount';
import { auth } from './server/server';
import ProtectRoute from './Layout/ProtectRoute';


function Loading(){

  return(
    <div>
      Loading
    </div>
  )
}



function Routers(){

  return(
    <div>
      <Routes>
        <Route path='' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>

          {/** 로그인이 필요한 라우트 */}
          <Route element={<ProtectRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Route>
        
        {/** 로그인 관련 라우트 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-account' element={<CreateAccount/>}/>
      </Routes>
    </div>
  )
}



function App() {
  const [loading, setLoading] = useState(true);


  async function isLogin(){
    await auth.authStateReady();
  }

  function initFun(){
    setLoading(false);
  }

  useEffect(()=>{
    isLogin();
    initFun();
  },[])
  
  return (
    <div>
      { loading ? <Loading/> : <Routers/> }
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import CreateAccount from './components/CreateAccount';
import { auth } from './server/server';


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
          <Route path='/profile' element={<Profile/>}/>
        </Route>
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

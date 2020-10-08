import React,{useEffect,useState} from 'react';

import Routes from './routes';

import Menu from './components/Menu';
import EditUser from './pages/EditUserGer';
import "./styles.css"
import AuthApi from './AuthApi';
import Cookies from "js-cookie"
const App = () =>  {
  const [auth, setAuth]= useState(0)
  const readCookie = () =>{
    const user =Cookies.get('user')
    const nivel =Cookies.get('nivel')
    if(user){
      setAuth(parseInt(nivel))
    }
  }
useEffect(()=>{
  readCookie()
  
},[])
  return(
  <AuthApi.Provider value={{auth,setAuth}}>
    <Routes />
  </AuthApi.Provider>
)
};

export default App;

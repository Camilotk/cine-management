import React,{useState} from 'react';
import "./styles.css";
import Logout from '../../components/LogoutHeader'
import Logo from "../../assets/logo.png";
import Not from "../../components/Notifications" 
import MenuItemH from "../../components/MenuItemH"
import MenuComponent from "../../components/MenuComponent"
import api from '../../services/api';
import Cookies from "js-cookie"
const Header = () => {
    const [userInfo, setUserInfo] = useState({});  
    const [not, setNot] = useState(false);
    
    
  const readUserInfo =async ()=>{
      const user =Cookies.get('user')
      const response = await api.get(`/users/${user}`)
      setUserInfo(response.data)
    }
    React.useEffect(()=>{
      readUserInfo()
      
    },[])
    const handleNot=()=>{
        
        setNot(!not) 
        
    } 
    
    return(
    <>
    <Not className={not? "show":""}/>
    <header style={{display:"flex", justifyContent:"space-between"}} id="main-header">
    <img src={Logo} className="logoH"/>
    
    <ul className="menuList">
    <MenuItemH link="/home"  textLink="EM CARTAZ"/>
    <MenuItemH link="/historico"  textLink="HISTÓRICO"/>
    </ul>
    <ul className="menuList">
    <li><a><span className="fas fa-shopping-cart fa-2x icons" ></span></a></li>
    <li style={not ? {borderBottom: '3px solid royalblue'}:{}}><a onClick={handleNot}><span  className="fas fa-bell fa-2x icons" ></span></a></li>
    
    <MenuItemH link="/editUser" imgLink={userInfo.perfil?require(`../../images/${userInfo.perfil}`):require("../../assets/svgs/usuarios.svg")} textLink={userInfo.nome}/>
    </ul>
    
    
    
    <Logout/>
    </header>
    
    </>
    
)}

export default Header;
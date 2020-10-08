import React, {useState} from 'react';
import "./styles.css";
import { NavLink } from 'react-router-dom';
import SVG_usuario from "../../assets/svgs/usuarios.svg";
import SVG_arrow from "../../assets/svgs/arrow.svg";
import SVG_filmes from "../../assets/svgs/filmes.svg";
import SVG_relatorios from "../../assets/svgs/relatorios.svg";
import SVG_salas from "../../assets/svgs/salas.svg";
import SVG_sessoes from "../../assets/svgs/sessoes.svg";
import SVG_snacks from "../../assets/svgs/snacks.svg";
import MenuItem from "../MenuItem";
import MenuUser from "../MenuUser";
import Cookies from "js-cookie";
import api from "../../services/api"

const Menu = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [toggleSubmenu, setToggleSubmenu] = useState(false);
    const [userInfo, setUserInfo] = useState({});  
  const readUserInfo =async ()=>{
      const user =Cookies.get('user')
      const response = await api.get(`/users/${user}`)
      setUserInfo(response.data)
    }
    React.useEffect(()=>{
      readUserInfo()
      
    },[])
    
    const User1= require(`../../../../node/src/images/${userInfo.perfil}`)
    const User= require("../../assets/svgs/usuarios.svg")
    return (
        <>
            <div className="btn" onClick={() => {setToggleSidebar(true)}}>
            <span className="fas fa-bars"></span>
            </div>
            <nav className={toggleSidebar ? "sidebar show" : "sidebar"} >
                <ul>
                    
                    <MenuUser link="/editUserGer" imgLink={userInfo.perfil?User1:User} textLink={userInfo.nome}/>
                    <MenuItem link="/users" imgLink={SVG_usuario} textLink="Usuários"/>
                    <MenuItem link="/rooms" imgLink={SVG_salas} textLink="Salas"/>
                    <MenuItem link="/movies" imgLink={SVG_filmes} textLink="Filmes"/>
                    <MenuItem link="/sessions" imgLink={SVG_sessoes} textLink="Sessões"/>
                    
                    <li onClick={() => {setToggleSubmenu(toggleSubmenu ? false : true)}} className={toggleSubmenu ? "active" : " "} >
                        <a className="rel-btn"><img src={SVG_relatorios} className="svgs"/>Relatórios
                        <span className={toggleSubmenu ? "fas fa-caret-down rotate" : "fas fa-caret-down "}></span>
                        </a>
                        </li>
                        <ul className={toggleSubmenu ? "feat-show show" : "feat-show"} >
                        <li><NavLink exact to={'/relmovies'} innerRef={open => {if(window.location.pathname=='/relmovies') setToggleSubmenu(true)}} activeStyle={{color: 'royalblue', background: 'rgba(176,196,222,0.5)', borderLeftColor: 'royalblue',}}><img src={SVG_filmes} className="minisvgs"/>Filmes</NavLink></li>
                        <li><NavLink exact to={'/relclientes'} innerRef={open => {if(window.location.pathname=='/relclientes') setToggleSubmenu(true)}} activeStyle={{color: 'royalblue', background: 'rgba(176,196,222,0.5)', borderLeftColor: 'royalblue',}}><img src={SVG_usuario} className="minisvgs"/>Clientes</NavLink></li>
                        </ul>
                    
                    <li className="minorar" onClick={() => {setToggleSidebar(false)}}>
                        <img src={SVG_arrow} className="minisvgs"/>
                        Minorar
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Menu;


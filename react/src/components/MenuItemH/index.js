import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

const MenuItemH = ({ link,imgLink, textLink, active }) => (
    
  <li className={active ? "active" : "" } >
    <NavLink exact to={link}  className={imgLink ? "userItem": '' } activeStyle={{
      color: 'royalblue',
      borderBottomColor: 'royalblue',
    }}>
      {imgLink ? <img src={imgLink} className="perfil"/>: '' }
      
      {textLink}
    </NavLink>
  </li>
);

export default MenuItemH;
import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.css';

const MenuComponent = ({ textLink,to, active,click }) => (
    
  <li className={active ? "active" : "" } >
    <a href={to} onClick={click}>
      
      {textLink}
    </a>
  </li>
);

export default MenuComponent;
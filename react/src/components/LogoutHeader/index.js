import React, {useState} from 'react';
import "./styles.css";
import AuthApi from '../../AuthApi';
import Cookies from "js-cookie"


const Logout = () => {
    const Auth =React.useContext(AuthApi)
    const handleOnClick = () =>{
        Auth.setAuth(0)
       Cookies.remove("user")
       Cookies.remove("nivel")
    }
    return (
        <>
            <div className="logoutBtnH">
            <span onClick={handleOnClick} className="fas fa-power-off fa-lg"></span>
            </div>
        </>
    );
}

export default Logout;

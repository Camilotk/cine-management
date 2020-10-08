import React, {useState, useRef} from 'react';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../services/api';
import Input from '../../components/Form/input';
import Select from '../../components/Form/select';
import Logo from "../../assets/logo.png";
import { Link, Redirect } from 'react-router-dom';
import Functions from "../../functions"
import AuthApi from "../../AuthApi"
import Cookies from "js-cookie"

export default function Login() {
  
  const Auth=React.useContext(AuthApi)
 
  
  const [aviso, setaviso] = useState(false);  
  
    const formRef =useRef(null)
  const handleSubmit = async (data) => {
    const response = await api.get(`/allUsers`)

    
    response.data.map(user=>{
      if((user.email==data.email)&&(user.password==Functions.criptografar(data.password))){
        
        Auth.setAuth(user.nivel)
        Cookies.set("user", `${user.id}`)
        Cookies.set("nivel", `${user.nivel}`)
        
      }else(
        setaviso(true)
      )
      
    })  
    
  }
  
  const reload=()=>{
    window.location.reload()
  }
  
  return (
    
    <>
    <div className="logoBox"><img className="logo" src={Logo}></img></div>
    <div className="warn"><span style={aviso ? {display:'block'}: {display:'none'}}>Email ou senha incorretos.</span></div>
      <div className="conteudo">
        
      <Form ref={formRef} onSubmit={handleSubmit}>
        
      
      <div className="inputItemCad"><span className="spanCad">SEU EMAIL:</span>  <Input id='cadEmail' required name="email" type="email" /></div>
      <div className="inputItemCad"><span className="spanCad">SUA SENHA:</span>  <Input id='cadSenha' required name="password" type="password" /></div>
      
      
      <button className="logar">Logar</button>
      <div className="a"><Link to={'/cadastro'}>CRIAR CONTA</Link></div>
      </Form>
      </div>
    </>
  );
}

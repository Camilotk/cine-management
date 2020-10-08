import React, {useState, useRef} from 'react';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../services/api';
import Input from '../../components/Form/input';
import Select from '../../components/Form/select';
import Logo from "../../assets/logo.png";
import { Link, Redirect } from 'react-router-dom';
import Functions from "../../functions"

export default function Cadastro() {
    const [created, setcreated] = useState(false);
    const formRef =useRef(null)
  const handleSubmit = async (data) => {
    if(!Functions.senha(data.password)){
        formRef.current.setFieldError('password','A senha deve conter ao menos uma letra maiúscula, 4 minúsculas e 2 numeros.')
      }
      if(data.password!==data.confirmpassword){
        formRef.current.setFieldError('confirmpassword','Senhas diferentes')
      }
      if(!Functions.nome(data.nome)){
        formRef.current.setFieldError('nome','O nome deve ter ao menos 4 caracteres.')
      }
      if( ! await Functions.email(data.email)){
        formRef.current.setFieldError('email','Email invalido ou ja está cadastrado.')
      }
      if(Functions.senha(data.password) && data.password==data.confirmpassword && Functions.nome(data.nome) && await Functions.email(data.email)){
        
        okCreate(data)
      }
  }
  const okCreate= async (data) => {
      try{
        data.password=Functions.criptografar(data.password)
      const response = await api.post(`/users`, data)  
      setcreated(true)
      }catch(response){
        alert(response.response.data.error)
    }
  };
  const reload=()=>{
    window.location.reload()
  }
  
  return (
    
    <>
    {created ? <Redirect to="/" /> : ''}
    <div className="logoBox"><img className="logo" src={Logo}></img></div>
      <div className="conteudo">
      <Form ref={formRef} onSubmit={handleSubmit}>
        
      <div className="inputItemCad"><span className="spanCad">SEU NOME:</span> <Input id='cadNome' required name="nome" type="text" /></div>
      <div className="inputItemCad"><span className="spanCad">SEU EMAIL:</span>  <Input id='cadEmail' required name="email" type="email" /></div>
      <div className="inputItemCad"><span className="spanCad">SUA SENHA:</span>  <Input id='cadSenha' required name="password" type="password" /></div>
      <div className="inputItemCad"><span className="spanCad">CONFIRMAR SUA SENHA:</span>  <Input id='cadConfirmSenha' required name="confirmpassword" type="password" /></div>
      <Input required defaultValue="2" name="nivel" type="hidden" />
      <button className="cadastrar">Cadastrar</button>
      <div className="a"><Link to={'/'}>JÁ TENHO UMA CONTA</Link></div>
      </Form>
      </div>
    </>
  );
}

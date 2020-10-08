import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../../services/api';
import Input from '../../Form/input';
import Select from '../../Form/select';
import Functions from '../../../functions';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: '#1e1e1e',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'royalblue'
  },
}));

export default function SimpleModal(item) {
  const classes = useStyles();
  const formRef =useRef(null)

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [created, setcreated] = useState(false);
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
  const handleOpen = () => {
  setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const okCreate= async (data) => {
      try{
        delete data['confirmpassword'];
        data.password=Functions.criptografar(data.password)
      const response = await api.post(`/${item.where}`, data)  
      setcreated(true)
      }catch(response){
        alert(response.response.data.error)
      }
   
  
  };
  const reload=()=>{
    window.location.reload()
  }
  const body = (
      
    <div style={modalStyle } className={classes.paper}>
      <h2 id="simple-modal-title">{item.texto}</h2>
      <br/>
      <Form ref={formRef} onSubmit={handleSubmit}>
      <div className="inputItem"><span className="span">Nome:</span> <Input required id="nome" name="nome" type="text" /></div>
      <div className="inputItem"><span className="span">Email:</span>  <Input required id="email"name="email" type="email" /></div>
      <div className="inputItem"><span className="span">Senha:</span>  <Input required id="password" name="password" type="password" /></div>
      <div className="inputItem"><span className="span">Confirma Senha:</span>  <Input required id="confirmpassword" name="confirmpassword" type="password" /></div>
      <div className="inputItem"><span className="span">Nível de acesso:</span> 
       <Select required className="select" name="nivel">
         <option selected disabled value=""></option>
         <option value="1">Gerente</option>
         <option value="2">Cliente</option>
       </Select>
       </div>
      <br/>
      <div style={{
          display:'flex',
          justifyContent:'space-between'
      }}>
          
          <button className="btns" onClick={handleClose} style={{backgroundColor:'red'}}>Cancelar</button>
          <button className="btns" style={{backgroundColor:'green'}}>Criar</button>
          
      </div>
      </Form>
    </div>
  );
  const body2 = (
      
    <div style={ modalStyle } className={classes.paper}>
      <h2 id="simple-modal-title">Usuário criado com sucesso!</h2>
      <br/>
      <div style={{
          display:'flex',
          justifyContent:'center'
      }}>
          
          <button className="btns" onClick={handleClose, reload} style={{backgroundColor:'royalblue'}}>OK</button>
          
      </div>
    </div>
  );
  return (
    <>
      <button type="button" style={{background:'none', border:'none'}} onClick={handleOpen}>
      <span className="fas fa-plus-circle fa-2x"/>
      </button>
      <Modal
        open={open}
        onClose={created ? (handleClose, reload) : handleClose }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          {created ? body2 : body }
      </Modal>
    </>
  );
}

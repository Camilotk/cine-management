import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../../services/api';
import Input from '../../Form/input';

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
      okCreate(data)
  }
  const handleOpen = () => {
  setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const okCreate= async (data) => {
      try{
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
      <div className="inputItem"><span className="span">Nome:</span> <Input required name="nome" type="text" /></div>
      
      <div className="inputItem"><span className="span">Assentos:</span>  <Input required name="assentos" type="number" /></div>
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
      <h2 id="simple-modal-title">Sala criada com sucesso!</h2>
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

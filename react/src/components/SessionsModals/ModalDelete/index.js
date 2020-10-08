import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import "./styles.css"
import api from '../../../services/api';



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
    width: 400,
    backgroundColor: '#1e1e1e',
    border: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: 'royalblue'
  },
}));

export default function SimpleModal(item) {
    
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [deleted, setdeleted] = useState(false);

  const handleOpen = () => {
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const okDelete = async () => {
    try{
        const response = await api.delete(`/${item.where}/${item.id}`)
        setdeleted(true)
        
    }catch(response){
        alert('Houve um erro ao deletar esta sessão: '+response.response.data.error)
    }
   
  
  };
  const reload=()=>{
    window.location.reload()
  }
  const body = (
      
    <div style={modalStyle } className={classes.paper}>
      <h2 id="simple-modal-title">{item.texto}</h2>
      <br/>
      <p id="simple-modal-description">
      {item.data}
      </p>
      <p id="simple-modal-description">
      {item.horario}
      </p>
      <p id="simple-modal-description">
      {item.horarioFinal}
      </p>
      <p id="simple-modal-description">
      {item.animacao}
      </p>
      <p id="simple-modal-description">
      {item.audio}
      </p>
      <p id="simple-modal-description">
      {item.filme}
      </p>
      <p id="simple-modal-description">
      {item.sala}
      </p>
      
     <br/>
      <div style={{
          display:'flex',
          justifyContent:'space-between'
      }}>
          
          <button className="btns" onClick={handleClose} style={{backgroundColor:'red'}}>Cancelar</button>
          <button className="btns" onClick={okDelete}style={{backgroundColor:'green'}}>Deletar</button>
      </div>
    </div>
  );
  const body2 = (
      
    <div style={ modalStyle } className={classes.paper}>
      <h2 id="simple-modal-title">Sessão foi deletada com sucesso!</h2>
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
      <span className="fas fa-trash-alt"/>
      </button>
      <Modal
        open={open}
        onClose={deleted ? (handleClose, reload) : handleClose }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          {deleted ? body2 : body }
      </Modal>
    </>
  );
}

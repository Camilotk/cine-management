import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../../services/api';
import Input from '../../Form/input';
import File from '../../Form/file';
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
      if(confExt()&& confSize()){

        okCreate(data)
      }
      
  }
  const handleOpen = () => {
  setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const processUpload = (uploadedFile, name) => {
    const data = new FormData();

    data.append("file", uploadedFile, name);

    api.post("/posts", data);
  };
  const okCreate= async (data) => {
      try{
      var ext = data.file.name.split('.').pop();
      data.imagem=data.imagem+'.'+ext
      const response = await api.post(`/${item.where}`, data)  
      setcreated(true)
      
      var name=data.imagem
      processUpload(data.file,name)
      }catch(response){
        alert(response.response.data.error)
      }
   
  
  };
  const reload=()=>{
    window.location.reload()
  }
  const confSize=()=>{
    var file= formRef.current.getFieldValue('file')
    var maxSize=2 * 1024 * 1024
    if(file.size>maxSize){
      alert('O arquivo ultrapassou o limite de 2mb')
      return false
    }else{
      return true
    }
  }
  const confExt=()=>{
    var file= formRef.current.getFieldValue('file')
    const types = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (types.includes(file.type)) {
      return true
    } else {
      alert('Tipo de arquivo não suportado')
      return false
    }
  
  }
  const body = (
      
    <div style={modalStyle } className={classes.paper}>
      <h2 id="simple-modal-title">{item.texto}</h2>
      <br/>
      <Form ref={formRef} encType="multipart/form-data"  onSubmit={handleSubmit}>
      <div className="inputItem"><span className="span">Título:</span> <Input required name="titulo" type="text" /></div>
      
      <div className="inputItem"><span className="span">Nome imagem:</span>  <Input required name="imagem" type="text" /></div>
      <div className="inputItem"><span className="span">Arquivo:</span><File  name="file"/></div><span className="aviso">Atenção! A  imagem e seu nome não poderão ser editados! </span>
      <div className="inputItem"><span className="span">Descrição:</span>  <Input required name="descricao" type="text" /></div>
      <div className="inputItem"><span className="span">Duração:</span>  <Input required name="duracao" type="time"  /></div>
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
      <h2 id="simple-modal-title">Filme criado com sucesso!</h2>
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

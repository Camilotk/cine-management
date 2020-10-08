import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Form } from '@unform/web';
import "./styles.css"
import api from '../../../services/api';
import Input from '../../Form/input';
import Select from '../../Form/select';
import Rooms from '../../../pages/Rooms';

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
  
  const buscaRooms= async ()=> {
    try{
      const rooms=await api.get(`/allrooms`)
      setrooms(rooms)
    }catch(error){
      alert(error)
    }
  }
  const buscaMovies= async ()=> {
    try{
      const movies=await api.get(`/allmovies`)
      setmovies(movies)
    }catch(error){
      alert(error)
    }
  }
  
  
  const classes = useStyles();
  const formRef =useRef(null)
  
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [created, setcreated] = useState(false);
  const [rooms, setrooms] = useState({data:[{id:0}]});
  const [movies, setmovies] = useState({data:[{id:0}]});
  const handleSubmit = async (data) => {
      okCreate(data)
      
  }
  const handleOpen = () => {
  setOpen(true);
  buscaRooms() 
  buscaMovies() 
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
      <div className="inputItem"><span className="span">Data:</span> <Input required name="data" type="date" /></div>
      
      <div className="inputItem"><span className="span">Horario:</span>  <Input required name="horario" type="time" /></div>
      <div className="inputItem"><span className="span">Animação:</span>  
      <Select defaultValue="0" className="select" required name="animacao" >
        <option disabled  value='0'></option>
        <option value='1'>2D</option>
        <option value='2'>3D</option>
        </Select>
        </div>
        <div className="inputItem"><span className="span">Áudio:</span> 
        <Select defaultValue="0" className="select" required name="audio" >
        <option disabled  value='0'></option>
        <option value='1'>Dublado</option>
        <option value='2'>Legendado</option>
        </Select>
        </div>
        <div className="inputItem"><span className="span">Sala:</span> 
        <Select defaultValue="0" className="select" required name="room_id" >
        <option disabled  value='0'></option>
        {
        rooms.data.map(room=>(
          <option key={room.id} value={room.id}>{room.nome} ({room.assentos} assentos)</option>
        ))

        }
        </Select>
        </div>
        <div className="inputItem"><span className="span">Filme:</span> 
        <Select defaultValue="0" className="select" required name="movie_id" >
        <option disabled  value='0'></option>
        {
        movies.data.map(movie=>(
          <option key={movie.id} value={movie.id}>{movie.titulo} ({movie.duracao})</option>
        ))

        }
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
      <h2 id="simple-modal-title">Sessão criada com sucesso!</h2>
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

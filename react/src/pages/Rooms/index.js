import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Menu from '../../components/Menu'
import ModalDelete from '../../components/RoomsModals/ModalDelete'
import ModalEdit from '../../components/RoomsModals/ModalEdit'
import ModalCreate from '../../components/RoomsModals/ModalCreate'
import Logout from '../../components/Logout'
export default class Rooms extends Component{

    state= {
        rooms:[],
        roomInfo:[],
        page: 1,
        search: ''


    }
    
    pressEnter=(e)=>{
        var key = e.which || e.keyCode;
        if (key == 13){
            var value= document.getElementById('input').value
            
            this.setState({search:value})
            this.loadProducts(1, value)
        }
        
    }
    
    componentDidMount () {
        
        this.loadProducts();
    }
    

    loadProducts = async (page = 1,state="") => {
        if(state==""){
            var response = await api.get(`/rooms?page=${page}`)
            
        }else{
            var response = await api.get(`/roomSearch/${state}?page=${page}`) 
            
        }
        
        const {docs, ...roomInfo}= response.data;
        this.setState({rooms: docs, roomInfo,page})
        
    }
    prevPage =  () => {
        const {page, roomInfo} = this.state;

        if(page== 1) return;
        const pageNumber= page -1
        this.loadProducts(pageNumber,this.state.search)
    }
    nextPage =  () => {
        const {page, roomInfo} = this.state;

        if(page== roomInfo.pages) return;
        const pageNumber= page +1
        this.loadProducts(pageNumber,this.state.search)
    }
    
    render(){
    const {rooms} = this.state; 
    
    return (
        
        <React.Fragment>
            <Menu />
            <Logout/> 
            <div className="content">
        <div className="top">
            <ModalCreate  where="rooms"  texto="Criar Sala:"/>
            <div className="submit-line">
            <input onKeyUp={this.pressEnter}  id="input" className="input"></input>
            <button className="submit-lente" type="submit">
            <i className="fa fa-search"></i>
            </button>
            </div>
            
        </div>
        <div className="table">
        <table className='rooms-list'>
            <tbody>
            <tr>
                <td className='item'>Nome</td>
                <td className='item'>Assentos</td>
                <td className='item'>Operações</td>
            </tr>
            {rooms.map(room=>(
            
                <tr key={room.id} className='room-item'>
                    <td className='item'>{room.nome}</td>
                    <td className='item'>{room.assentos}</td>
                   
                    <td className='item op'>
                        <ModalEdit id={room.id} where="rooms" nome={room.nome} assentos={room.assentos}  texto="Editar a sala:"/>
                        <ModalDelete id={room.id} where="rooms" nome={room.nome} assentos={room.assentos}  texto="Tem certeza que deseja deletar a sala:"/>
                    </td>
                    
                </tr>
                
            ))}
            </tbody>
        </table>
        </div>
        <div className='pagina'>
            <p>{rooms.length} de {this.state.roomInfo.total} registros</p>
        <button className="buttons" onClick={this.prevPage}> <span className="fas fa-angle-left fa-2x"></span> </button>
        <p>{this.state.page}</p>
        <button className="buttons" onClick={this.nextPage}> <span className="fas fa-angle-right fa-2x"></span> </button>
        </div>
        </div>
        </React.Fragment>
    )
    }

}

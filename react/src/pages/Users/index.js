import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Menu from '../../components/Menu'
import ModalDelete from '../../components/UserModals/ModalDelete'
import ModalEdit from '../../components/UserModals/ModalEdit'
import ModalCreate from '../../components/UserModals/ModalCreate'
import Logout from '../../components/Logout'
export default class Users extends Component{

    state= {
        users:[],
        userInfo:[],
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
    nivel(x){
        if(x==1){
            return "Gerente"
        }else if(x==2){
            return "Cliente"
        }
    }
    componentDidMount () {
        
        this.loadProducts();
    }
    

    loadProducts = async (page = 1,state="") => {
        if(state==""){
            var response = await api.get(`/users?page=${page}`)
            
        }else{
            var response = await api.get(`/userSearch/${state}?page=${page}`) 
            
        }
        
        const {docs, ...userInfo}= response.data;
        this.setState({users: docs, userInfo,page})
        
    }
    prevPage =  () => {
        const {page, userInfo} = this.state;

        if(page== 1) return;
        const pageNumber= page -1
        this.loadProducts(pageNumber,this.state.search)
    }
    nextPage =  () => {
        const {page, userInfo} = this.state;

        if(page== userInfo.pages) return;
        const pageNumber= page +1
        this.loadProducts(pageNumber,this.state.search)
    }
    
    render(){
    const {users} = this.state; 
    
    
    return (
        
        <React.Fragment>
            <Menu />
            <Logout/> 
            <div className="content">
        <div className="top">
            <ModalCreate  where="users"  texto="Criar usuário:"/>
            <div className="submit-line">
            <input onKeyUp={this.pressEnter}  id="input" className="input"></input>
            <button className="submit-lente" type="submit">
            <i className="fa fa-search"></i>
            </button>
            </div>
            
        </div>
        <div className="table">
        <table className='users-list'>
            <tbody>
            <tr>
                <td className='item'>Nome</td>
                <td className='item'>Email</td>
                <td className='item'>Nível de acesso</td>
                <td className='item'>Operações</td>
            </tr>
            {users.map(user=>(
            
                <tr key={user.id} className='user-item'>
                    <td className='item'>{user.nome}</td>
                    <td className='item'>{user.email}</td>
                    <td className='item'>{this.nivel(user.nivel)}</td>
                    <td className='item op'>
                        <ModalEdit id={user.id} where="users" nome={user.nome} email={user.email} nivel={user.nivel} texto="Editar usuário:"/>
                        <ModalDelete id={user.id} where="users" nome={user.nome} email={user.email} nivel={this.nivel(user.nivel)} texto="Tem certeza que deseja deletar o usuário:"/>
                    </td>
                    
                </tr>
                
            ))}
            </tbody>
        </table>
        </div>
        <div className='pagina'>
            <p>{users.length} de {this.state.userInfo.total} registros</p>
        <button className="buttons" onClick={this.prevPage}> <span className="fas fa-angle-left fa-2x"></span> </button>
        <p>{this.state.page}</p>
        <button className="buttons" onClick={this.nextPage}> <span className="fas fa-angle-right fa-2x"></span> </button>
        </div>
        </div>
        </React.Fragment>
    )
    }

}

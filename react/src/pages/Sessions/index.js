import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Menu from '../../components/Menu'
import ModalDelete from '../../components/SessionsModals/ModalDelete'
import Logout from '../../components/Logout'
import ModalCreate from '../../components/SessionsModals/ModalCreate'

export default class Sessions extends Component{

    state= {
        sessions:[],
        sessionInfo:[],
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
    animacao(x){
        if(x==1){
            return "2D"
        }else if(x==2){
            return "3D"
        }
    }
    audio(x){
        if(x==1){
            return "Dublado"
        }else if(x==2){
            return "Legendado"
        }
    }
    data(x){
        x=x.replace('Z','')
        var d = new Date(x);
        var year = d.getFullYear();
        var month = d.getMonth()+1;
        var day = d.getDate();
        day=("00" + day).slice(-2)
        month=("00" + month).slice(-2)
        return(day+'/'+month+'/'+year)
    }
    componentDidMount () {
        
        this.loadProducts();
    }
    

    loadProducts = async (page = 1,state="") => {
        if(state==""){
            var response = await api.get(`/sessions?page=${page}`)
            
        }else{
            var response = await api.get(`/sessionSearch/${state}?page=${page}`) 
            console.log(response)
        }
        
        const {docs, ...sessionInfo}= response.data;
        this.setState({sessions: docs, sessionInfo,page})
        
    }
    prevPage =  () => {
        const {page, sessionInfo} = this.state;

        if(page== 1) return;
        const pageNumber= page -1
        this.loadProducts(pageNumber,this.state.search)
    }
    nextPage =  () => {
        const {page, sessionInfo} = this.state;

        if(page== sessionInfo.pages) return;
        const pageNumber= page +1
        this.loadProducts(pageNumber,this.state.search)
    }
    
    render(){
    const {sessions} = this.state; 
    
    return (
        
        <React.Fragment>
            <Menu />
            <Logout/> 
            <div className="content">
        <div className="top">
            <ModalCreate  where="sessions"  texto="Criar usuário:"/>
            <div className="submit-line">
            <input onKeyUp={this.pressEnter}  id="input" className="input"></input>
            <button className="submit-lente" type="submit">
            <i className="fa fa-search"></i>
            </button>
            </div>
            
        </div>
        <div className="table">
        <table className='sessions-list'>
            <tbody>
            <tr>
                <td className='item'>Filme</td>
                <td className='item'>Sala</td>
                <td className='item'>Data</td>
                <td className='item'>Horário</td>
                <td className='item'>Final</td>
                <td className='item'>Animação</td>
                <td className='item'>Áudio</td>
                <td className='item'>Operações</td>
            </tr>
            {sessions.map(session=>(
            
                <tr key={session.id} className='session-item'>
                    <td className='item'>{session.movies.titulo}</td>
                    <td className='item'>{session.rooms.nome}</td>
                    <td className='item'>{this.data(session.data)}</td>
                    <td className='item'>{session.horario}</td>
                    <td className='item'>{session.horarioFinal}</td>
                    <td className='item'>{this.animacao(session.animacao)}</td>
                    <td className='item'>{this.audio(session.audio)}</td>
                    
                    <td className='item op'>
                        <ModalDelete id={session.id} where="sessions" data={this.data(session.data)} horario={session.horario} horarioFinal={session.horarioFinal} animacao={this.animacao(session.animacao)} audio={this.audio(session.audio)} filme={session.filme} sala={session.sala} texto="Tem certeza que deseja deletar a sessão:"/>
                    </td>
                    
                </tr>
                
            ))}
            </tbody>
        </table>
        </div>
        <div className='pagina'>
            <p>{sessions.length} de {this.state.sessionInfo.total} registros</p>
        <button className="buttons" onClick={this.prevPage}> <span className="fas fa-angle-left fa-2x"></span> </button>
        <p>{this.state.page}</p>
        <button className="buttons" onClick={this.nextPage}> <span className="fas fa-angle-right fa-2x"></span> </button>
        </div>
        </div>
        </React.Fragment>
    )
    }

}

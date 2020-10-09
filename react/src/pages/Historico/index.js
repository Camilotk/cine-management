import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Header from '../../components/Header'

import Cookies from "js-cookie"
export default class Historicos extends Component{

    state= {
        historicos:[],
        historicoInfo:[],
        page: 1,
        search: '',
        error:''


    }
    
    pressEnter=(e)=>{
        var key = e.which || e.keyCode;
        if (key == 13){
            var value= document.getElementById('input').value
            
            this.setState({search:value})
            this.loadProducts(1, value)
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
        try{
        const user =Cookies.get('user')
        if(state==""){
            
            var response = await api.get(`/historicos/${user}?page=${page}`)
            
        }else{
            var response = await api.get(`/historicoSearch/${user}/${state}?page=${page}`) 
            
        }
        
        const {docs, ...historicoInfo}= response.data;
        this.setState({historicos: docs, historicoInfo,page})
    }catch(response){
        this.setState({error:response.response.data.error})
    }
    }
    prevPage =  () => {
        const {page, historicoInfo} = this.state;

        if(page== 1) return;
        const pageNumber= page -1
        this.loadProducts(pageNumber,this.state.search)
    }
    nextPage =  () => {
        const {page, historicoInfo} = this.state;

        if(page== historicoInfo.pages) return;
        const pageNumber= page +1
        this.loadProducts(pageNumber,this.state.search)
    }
    
    render(){
    const {historicos} = this.state; 
    
    
    return (
        
        <React.Fragment>
            <Header/> 
            <div className="content" >
    {this.state.error!==''? <div className="vazio">{this.state.error}</div>:<>
        <div className="top" style={{justifyContent:"flex-end"}}>
            <div className="submit-line">
            <input onKeyUp={this.pressEnter}  id="input" className="input"></input>
            <button className="submit-lente" type="submit">
            <i className="fa fa-search"></i>
            </button>
            </div>
            
        </div>
        <div className="table">
        <table className='historicos-list'>
            <tbody>
            <tr>
                <td className='item'>Filme</td>
                <td className='item'>Sala</td>
                <td className='item'>Data</td>
                
            </tr>
            {historicos.map(historico=>(
            
                <tr key={historico.id} className='historico-item'>
                    <td className='item'>{historico.movies.titulo}</td>
                    <td className='item'>{historico.rooms.nome}</td>
                    <td className='item'>{this.data(historico.data)}</td>
                    
                    
                </tr>
                
            ))}
            </tbody>
        </table>
        </div>
        <div className='pagina'>
            <p>{historicos.length} de {this.state.historicoInfo.total} registros</p>
        <button className="buttons" onClick={this.prevPage}> <span className="fas fa-angle-left fa-2x"></span> </button>
        <p>{this.state.page}</p>
        <button className="buttons" onClick={this.nextPage}> <span className="fas fa-angle-right fa-2x"></span> </button>
        </div>
        </>
        }
        </div>
        </React.Fragment>
    )
    }

}

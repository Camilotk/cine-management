import React,{useEffect, useState} from 'react';
import {withRouter} from "react-router-dom"
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Header from '../../components/Header'
import Cookies from "js-cookie"
class Cart extends Component{  
    state= {
        session:[],
        etapa:1,
        one:'active',
        two:'name',
        three:'name',
        seatsOcupados:[],
        assentos:0,
        fileiras:0,
        clickeds:[],
        price2d:0,
        price3d:0
    }
    
     animacao=(x)=>{
        if(x==1){
            return "2D"
        }else if(x==2){
            return "3D"
        }
    }
     data=(x)=>{
        var d= new Date(x)
        var day=d.getUTCDate()
        var month=d.getUTCMonth()+1
        return(day+'/'+month)
    }
    confirm=(session)=>{
        if(this.state.etapa==1){
            this.setState({one:'done',two:'active', etapa:2})
        }
        if(this.state.etapa==2){
            this.setState({two:'done',three:'active', etapa:3})
        }
        if(this.state.etapa==3){
            const user =Cookies.get('user')
            const req={user_id:user, refAssentos:this.state.clickeds,session_id:session}
            this.create(req)
        }
    }
    create= async (req)=>{
        try{
            await api.post(`/seats`,req)
            this.reload()
        }catch(error){
            alert('Houve um erro:'+error.response.data.error)
        }
    }
    reload=()=>{
        window.location.reload()
      }
     audio=(x)=>{
        if(x==1){
            return "DUB"
        }else if(x==2){
            return "LEG"
        }

    }
    seatClick(a){
        let array=this.state.clickeds
        array.push(a)
        this.setState({clickeds:array})
    }
    seatUnClick(a){
        let array=this.state.clickeds
        let index=array.indexOf(a)
        array.splice(index, 1)
        this.setState({clickeds:array})
    }
    criaAssentos=()=>{
        let alfabeto=['A','B','C','D','E']
        let array=[]
        for(let f=0;f<this.state.fileiras;f++){
            array.push([])
            if(f==this.state.fileiras-1){
                let diferenca=20-((this.state.fileiras*20)-this.state.assentos)
                if(diferenca==0){
                    for(let a=0;a<20;a++){
                        array[f].push(alfabeto[f]+`${a+1}`)
                    }
                }else{
                    for(let a=0;a<diferenca;a++){
                        array[f].push(alfabeto[f]+`${a+1}`)
                    }
                }
            }else{
                for(let a=0;a<20;a++){
                    array[f].push(alfabeto[f]+`${a+1}`)
                }
            }
            
        }
        return(array)
    }
    componentDidMount () {
        
        this.loadProducts();
    }
    
     loadProducts = async () => {
        const id = this.props.match.params.id;
        var array=[]
        var responsePrices = await api.get(`/prices`)
        this.setState({price2d:responsePrices.data[0].preco2d,price3d:responsePrices.data[0].preco3d})
        var responseSessions = await api.get(`/sessions/${id}`)
        array.push(responseSessions.data)
        this.setState({session:array})
        var responseSeats=await api.get(`/seatsBySession/${responseSessions.data.id}`)
         
        var arraySeats=[]
        if(responseSeats.data.length!==0){
            for(let c=0;c<responseSeats.data.length;c++){
                for(let i=0;i<responseSeats.data[c].refAssentos.length;i++){
                    arraySeats.push(responseSeats.data[c].refAssentos[i])
                }
            }
            this.setState({seatsOcupados:arraySeats})
        } 
        this.setState({assentos:responseSessions.data.rooms.assentos})
        this.setState({fileiras:Math.ceil(responseSessions.data.rooms.assentos/20)})
    }
    render(){
      
        const assentos=this.criaAssentos()
    return (
        <React.Fragment>
            <Header/>
            <ol className="progress" data-steps="4">
                <li className={this.state.one}>
                <span className="step"></span>
                </li>
            <li className={this.state.two}>
            <span className="step"></span>
                </li>
            <li className={this.state.three}>
            <span className="step"></span>
                </li>
 
                </ol>
            <div className="principal">
                {this.state.etapa==1?
                    this.state.session.map(session=>(
                            <div className="confirmacao" key={session.id}>
                            <span className="titulo">{session.movies.titulo}</span>
                <img src={require("../../images/"+session.movies.imagem)}/>
                <div className="sessionInfo">

                    <span>{session.rooms.nome}-<span className="minis">{this.animacao(session.animacao)}</span><span className="minis">{this.audio(session.audio)}</span></span>
                    <span>Data: {this.data(session.data)}</span>
                    <span>Horário: {session.horario.substring(5,0)}-{session.horarioFinal.substring(5,0)}</span>
                    <button className="proxEtp" onClick={this.confirm}>Confirmar</button>
                </div>
                </div>
                    ))
                    
                
                :""}
                {this.state.etapa==2?
                <div className="assentos">
                    <div className="grade">
                    {assentos.map(coluna=>(
                        <div key={coluna[1].substring(1,0)}>
                            {coluna.map(assento=>(
                                !this.state.seatsOcupados.includes(assento)?this.state.clickeds.includes(assento)?<div onClick={()=>this.seatUnClick(assento)} style={{backgroundColor:'royalblue'}} className="seat" type="checkbox" key={assento} value={assento}/>:<div onClick={()=>this.seatClick(assento)} className="seat" type="checkbox" key={assento} value={assento}/>:<div className="seat" style={{backgroundColor:'red',cursor:"default"}} type="checkbox" key={assento} value={assento}/>
                                
                            ))}
                        </div>
                    )
                        )}
                     </div>  
                     <div className="infosSelecionados">
                    <span>Assentos selecionados: {this.state.clickeds.length}</span>
                    {this.state.session.map(session=>(
                        <span key={session.id}>Preço: {session.animacao==1?this.state.clickeds.length*parseFloat(this.state.price2d):this.state.clickeds.length*parseFloat(this.state.price3d)} Pila</span> 
                    ))}
                        
                    </div>
                    <button className="proxEtp" onClick={this.confirm}>Confirmar</button> 
                </div>
                
                            
                    
                   
                
                :""}
                {this.state.etapa==3?
                    this.state.session.map(session=>(
                            <div className="confirmacaoFinal" key={session.id}>        
                    <div className="sessionInfoFinal">
                    <span className="titulo">{session.movies.titulo}</span>
                    <span>{session.rooms.nome}-<span className="minis">{this.animacao(session.animacao)}</span><span className="minis">{this.audio(session.audio)}</span></span>
                    <span>Data: {this.data(session.data)}</span>
                    <span>Horário: {session.horario.substring(5,0)}-{session.horarioFinal.substring(5,0)}</span>
                    <span>Assentos: {this.state.clickeds.map(assento=>(assento+","))}</span>
                    <span>Total: {session.animacao==1?this.state.clickeds.length*parseFloat(this.state.price2d):this.state.clickeds.length*parseFloat(this.state.price3d)} Pila</span>
                    <button className="proxEtp" onClick={()=>this.confirm(session.id)}>Confirmar</button>
                </div>
                </div>
                    ))
                    
                
                :""}
            </div>
        </React.Fragment>
    ) 
        
    }
    

}
export default  withRouter(Cart)

import React, {useState, Component} from 'react';
import "./styles.css";
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import api from "../../services/api"

export default class Notifications extends Component{

    state= {
        notifications:[],


    }
    
    
    componentDidMount () {
        
        this.loadProducts();
    }
    

    loadProducts = async () => {
    const user =Cookies.get('user')
    const response = await api.get(`/notifications/${user}`) 
        this.setState({notifications: response.data})
        
    }
     btns(data) {
         if(data.refAssentos){
             return(true)
         }else{
             return(false)
         }
         
     }
     
    
      render(){
        const aceitar= async (id) => {
            console.log(id)
            const response = await api.put(`/notifications/${id}`, {status:2})
         }
        const recusar= async (id) => {
            const response = await api.put(`/notifications/${id}`, {status:2})
         }
        const read= async (id)=>{
            const response = await api.put(`/notifications/${id}`, {status:2})
        }
    
    
    return (
        
        <React.Fragment>
           <nav className={`notification ${this.props.className}`} >
                <ul>
                {this.state.notifications.map(not=>(
            
            <li key={not.id}>
                {not.texto}
                <div className="confirm">
                    {this.btns(not) ? <><a onClick={()=>aceitar(not.id)}>Aceitar</a><a style={{color:'red'}} onClick={()=>recusar(not.id)}>Recusar</a></> : <a onClick={()=>read(not.id)}>Marcar como lida</a>}
                
                </div>
                
            </li>
        ))}
                </ul>
            </nav>
        </React.Fragment>
    )
    }

}

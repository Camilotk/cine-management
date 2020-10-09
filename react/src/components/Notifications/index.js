import React, {useState, Component} from 'react';
import "./styles.css";
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";
import api from "../../services/api"

export default class Notifications extends Component{

    state= {
        notifications:[],
        accept:''

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
        const reload=()=>{
            window.location.reload()
          }
        const aceitar= async (id,refAssentos,user_id,session_id) => {
            try{

            
            const response = await api.put(`/notifications/${id}`, {status:2})
            const response2 = await api.post(`/seats/`, {refAssentos, user_id,session_id})
            const response3 = await api.get(`/sessions/${session_id}`)
            var ref=""
            for(var c=0;c<refAssentos.length;c++){
            if(c==refAssentos.length-1){
                ref= ref+''+refAssentos[c]
            }else{
                ref= ref+''+refAssentos[c]+","
            }
            
            }
            
            alert( 'Seus assentos '+ref+' foram reservados para a sessão do filme: '+response3.data.movies.titulo +' do dia '+(new Date(response3.data.data.replace('Z',''))).toLocaleString('pt-BR',{day:'numeric' , month:'numeric' , year:'numeric' })+' as '+response3.data.horario.substring(0,5))
            reload()
        }catch(response2){
            alert('Houve um erro: '+ response2.response.data.error)
        }
         }
        const recusar= async (id) => {
            const response = await api.put(`/notifications/${id}`, {status:2})
            reload()
         }
        const read= async (id)=>{
            const response = await api.put(`/notifications/${id}`, {status:2})
            reload()
        }
    
    
    return (
        
        <React.Fragment>
           <nav className={`notification ${this.props.className}`} >
                <ul>
                {this.state.notifications.map(not=>(
            
            <li key={not.id}>
                {not.texto}
                <div className="confirm">
                    {this.btns(not) ? <><a onClick={()=>aceitar(not.id,not.refAssentos,not.user_id,not.session_id)}>Aceitar</a><a style={{color:'red'}} onClick={()=>recusar(not.id)}>Recusar</a></> : <a onClick={()=>read(not.id)}>Marcar como lida</a>}
                
                </div>
                
            </li>
        ))}
                </ul>
            </nav>
        </React.Fragment>
    )
    }

}

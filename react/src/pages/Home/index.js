import React from 'react';
import {Link} from "react-router-dom"
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Header from '../../components/Header'

export default class Home extends Component{

    state= {
        datas:[],
        page:1,
        active:'',
        diferenca:99999999999,
        sessions:[],
        movies:[],
        rooms:[],
        executou:false,
        click2d:false,
        click3d:false,
        clickDub:false,
        clickLeg:false,



    }
    animacao(x){
        if(x==1){
            return "2D"
        }else if(x==2){
            return "3D"
        }
    }
    handleActive(data){
       this.setState({active:data})
       this.loadProducts()
    }
    setActive(){
        if(!this.state.executou){
        let now=new Date().getTime()
        for(let i=0; i<this.state.datas.length; i++){
            if((new Date(this.state.datas[i]).getTime()-now)<this.state.diferenca ){
                this.setState({diferenca:new Date(this.state.datas[i]).getTime()-now})
                this.setState({active:this.state.datas[i]})

            }
        }
        this.setState({executou:true})
    }
    }
    listItems(items, pageActual, limitItems){
        let result = [];
        let totalPage = Math.ceil( items.length / limitItems );
        let count = ( pageActual * limitItems ) - limitItems;
        let delimiter = count + limitItems;
        if(pageActual <= totalPage){
            for(let i=count; i<delimiter; i++){
                if(items[i] != null){
                    
                    result.push(items[i]==this.state.active?<span  style={{color:"red"}} key={items[i]} className="data"><p>{this.dia(items[i])}</p><p>{this.data(items[i])}</p></span>:<span onClick={()=>this.handleActive(items[i])} key={items[i]} className="data"><p>{this.dia(items[i])}</p><p>{this.data(items[i])}</p></span>);

                }
                count++;
            }
        }
        
        return result;
    };
    dia(x){
        var now= new Date()
        var now=now.toISOString().substring(10,0)
        if(x==now){
            return("HOJE")
        }
        var d= new Date(x)
        var day=d.getUTCDay()
        var dias=['DOM','SEG','TER','QUA','QUI','SEX','SAB']
        return(dias[day])
    }
    data(x){
        var d= new Date(x)
        var day=d.getUTCDate()
        var month=d.getUTCMonth()+1
        return(day+'/'+month)
    }
    conferePassado(x){
        var d= new Date(x)
        var day=d.getUTCDate()
        var month=d.getUTCMonth()
        var year=d.getUTCFullYear()
        var nowd= new Date()
        var nowday=nowd.getUTCDate()
        var nowmonth=nowd.getUTCMonth()
        var nowyear=nowd.getUTCFullYear()
        
        if(parseInt(year.toString()+month.toString()+day.toString())>=parseInt(nowyear.toString()+nowmonth.toString()+nowday.toString())){
            return true
        }else{
            return false
        }

    }
    audio(x){
        if(x==1){
            return "DUB"
        }else if(x==2){
            return "LEG"
        }
    }
    componentDidMount () {
        
        this.loadProducts();
    }
    prevPage =  () => {
        const {page} = this.state;

        const pageNumber= page -1
        this.setState({page:pageNumber})
        
    }
    nextPage =  () => {
        const {page} = this.state;

        if(page== 7) return;
        const pageNumber= page +1
       this.setState({page:pageNumber})
    }
    carregaSessions(roomId, movieId){
        for(let c=0;c<this.state.sessions.length;c++){
            if(this.state.click3d){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==2){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.click3d && this.state.clickLeg){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==2 && this.state.sessions[c].audio==2){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.click3d && this.state.clickDub){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==2 && this.state.sessions[c].audio==1){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.click2d && this.state.clickDub){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==1 && this.state.sessions[c].audio==1){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.click2d && this.state.clickLeg){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==1 && this.state.sessions[c].audio==2){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.click2d){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].animacao==1){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            } else if(this.state.clickDub){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].audio==1){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
            }else if(this.state.clickLeg){
                if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId && this.state.sessions[c].audio==2){
                    return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                    }
        }else{
            if(this.state.sessions[c].movie_id==movieId&& this.state.sessions[c].room_id==roomId){
                return(<Link to={`cart/${this.state.sessions[c].id}`} className="sessionButton">{this.state.sessions[c].horario.substring(5,0)}<span>{this.animacao(this.state.sessions[c].animacao)}</span><span>{this.audio(this.state.sessions[c].audio)}</span></Link>)
                }             
        }
    }
}
    loadProducts = async () => {

            var responseSessions = await api.get(`/allSessions`)
            var arrayDatas=[]
            for(var c=0;c<responseSessions.data.length;c++){
               
                if(!arrayDatas.includes(responseSessions.data[c].data.substring(10,0))&& this.conferePassado(responseSessions.data[c].data)){
                    arrayDatas.push(responseSessions.data[c].data.substring(10,0))
                }

            }
            
            this.setState({datas:arrayDatas})
            this.setActive()
            var responseSessionsByDate=await api.get(`/sessionsByDate/${this.state.active+'T00:00:00.000Z'}`)
            this.setState({sessions:responseSessionsByDate.data})
            var responseMovies=await api.get(`/allMovies`)
            this.setState({movies:responseMovies.data})
            var responseRooms=await api.get(`/allrooms`)
            this.setState({rooms:responseRooms.data})
            
    }
    
    
    render(){
        const set3d=()=>{
            this.state.click3d? this.setState({click3d:false}) : this.setState({click3d:true})
           
        }
        const set2d=()=>{
            this.state.click2d? this.setState({click2d:false}) : this.setState({click2d:true})
            
        }
        const setLeg=()=>{
            this.state.clickLeg? this.setState({clickLeg:false}) : this.setState({clickLeg:true})
        }
        const setDub=()=>{
            this.state.clickDub? this.setState({clickDub:false}) : this.setState({clickDub:true})
        }
        
    return (
        
        <React.Fragment>
            <Header/>
            <div className="contentHome">
                <div className="datas">
                {this.state.page==1?"":
                    <span onClick={this.prevPage} className="fas fa-chevron-left fa-3x set"></span>
                }
                    {this.listItems(this.state.datas,this.state.page,7)}
                    {this.state.page==Math.ceil( this.state.datas.length / 7 )?"":
                    <span onClick={this.nextPage} className="fas fa-chevron-right fa-3x set"></span>
                }
                </div>
                <div className="filtros">{this.state.click2d? <input disabled onClick={set3d} type="checkbox"/> :<input onClick={set3d} type="checkbox"/>} 3D  {this.state.click3d? <input disabled onClick={set2d} type="checkbox"/> :<input onClick={set2d} type="checkbox"/>}  2D {this.state.clickDub? <input disabled onClick={setLeg} type="checkbox"/> :<input onClick={setLeg} type="checkbox"/>} LEG {this.state.clickLeg? <input disabled onClick={setDub} type="checkbox"/> :<input onClick={setDub} type="checkbox"/>} DUB</div>
                <div className="filmes">
                    {
                        this.state.movies.map(movie=>(
                            <div key={movie.id}>
                            <div className='movie' >
                                <img src={require("../../images/"+movie.imagem)}/>
                        <div className="desctemp">
                        <div >{movie.titulo}</div>
                        <div className="descricao">{movie.descricao}</div>
                        <div className="tempo">Tempo estimado:{movie.duracao.substring(5,0)}h</div>
                        </div>
                        </div>
                        <div className="salas">
                        {this.state.rooms.map(room=>(
                            <div key={room.id}>
                            <span  className="nomesala">{room.nome}</span>
                            {this.carregaSessions(room.id,movie.id)}
                            </div>
                        ))}
                            </div>
                        </div>
                        )
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    )
    }

}

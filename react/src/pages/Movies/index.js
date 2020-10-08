import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Component } from 'react';
import Menu from '../../components/Menu'
import ModalDelete from '../../components/MoviesModals/ModalDelete'
import ModalEdit from '../../components/MoviesModals/ModalEdit'
import ModalCreate from '../../components/MoviesModals/ModalCreate'
import Logout from '../../components/Logout'
export default class Movies extends Component{

    state= {
        movies:[],
        movieInfo:[],
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
            var response = await api.get(`/movies?page=${page}`)
            
        }else{
            var response = await api.get(`/movieSearch/${state}?page=${page}`) 
            
        }
        
        const {docs, ...movieInfo}= response.data;
        this.setState({movies: docs, movieInfo,page})
        
    }
    prevPage =  () => {
        const {page, movieInfo} = this.state;

        if(page== 1) return;
        const pageNumber= page -1
        this.loadProducts(pageNumber,this.state.search)
    }
    nextPage =  () => {
        const {page, movieInfo} = this.state;

        if(page== movieInfo.pages) return;
        const pageNumber= page +1
        this.loadProducts(pageNumber,this.state.search)
    }
    
    render(){
    const {movies} = this.state; 
    
    return (
        
        <React.Fragment>
            <Menu />
            <Logout/> 
            <div className="content">
        <div className="top">
            <ModalCreate  where="movies"  texto="Criar Filme:"/>
            <div className="submit-line">
            <input onKeyUp={this.pressEnter}  id="input" className="input"></input>
            <button className="submit-lente" type="submit">
            <i className="fa fa-search"></i>
            </button>
            </div>
            
        </div>
        <div className="table">
        <table className='movies-list'>
            <tbody>
            <tr>
                <td className='item'>Título</td>
                <td className='item'>Imagem</td>
                <td className='item'>Descrição</td>
                <td className='item'>Duração</td>
                <td className='item'>Operações</td>
            </tr>
            {movies.map(movie=>(
            
                <tr key={movie.id} className='movie-item'>
                    <td className='item'>{movie.titulo}</td>
                    <td className='item'>{movie.imagem}</td>
                    <td className='item'>{movie.descricao}</td>
                    <td className='item'>{movie.duracao}</td>
                    <td className='item op'>
                        <ModalEdit id={movie.id} where="movies" titulo={movie.titulo} imagem={movie.imagem} descricao={movie.descricao} duracao={movie.duracao} texto="Editar o filme:"/>
                        <ModalDelete id={movie.id} where="movies" titulo={movie.titulo} imagem={movie.imagem} descricao={movie.descricao} duracao={movie.duracao} texto="Tem certeza que deseja deletar o filme:"/>
                    </td>
                    
                </tr>
                
            ))}
            </tbody>
        </table>
        </div>
        <div className='pagina'>
            <p>{movies.length} de {this.state.movieInfo.total} registros</p>
        <button className="buttons" onClick={this.prevPage}> <span className="fas fa-angle-left fa-2x"></span> </button>
        <p>{this.state.page}</p>
        <button className="buttons" onClick={this.nextPage}> <span className="fas fa-angle-right fa-2x"></span> </button>
        </div>
        </div>
        </React.Fragment>
    )
    }

}

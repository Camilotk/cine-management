const Movies = require( '../models/movies');
const Functions = require( '../../functions');
const sequelize =require('sequelize')
module.exports = {
  async index(req, res) {
    try {
      const { page=1 }= req.query;
        const options = {
          
          page, // Default 1
          paginate: 10, 
          
        }
        const movie = await Movies.paginate(options);
      
      if(!movie){
        return res.json("Movies not found.")
      }

      return res.json(movie);
      
    } catch (error) {
      return res.status(400).json({ error: `There's no movies, my friend :(` });
    }
  },
  async relIndex(req, res) {
    try {
      const { page=1 }= req.query;
        const options = {
          order: sequelize.literal('faturamento DESC'),
          page, // Default 1
          paginate: 10, 
          
        }
        const movie = await Movies.paginate(options);
      
      if(!movie){
        return res.json("Movies not found.")
      }

      return res.json(movie);
      
    } catch (error) {
      return res.status(400).json({ error: `There's no movies, my friend :(` });
    }
  },
  async indexAll(req, res) {
    try {
      
        const movie = await Movies.findAll(
          {
            order: sequelize.literal('faturamento DESC'),
          }
        );
      
      if(!movie){
        return res.json("Movies not found.")
      }

      return res.json(movie);
      
    } catch (error) {
      return res.status(400).json({ error: `There's no movies, my friend :(` });
    }
  },

async show(req, res) {
    try {
        const { id } = req.params;
        const movies = await Movies.findByPk(id);
      


      return res.json(movies);
      
    } catch (error) {
      return res.status(400).json( error );
    }
  },

  async store(req, res) {
    try {
      const { imagem, titulo, descricao, duracao } = req.body
      const faturamento="0.00"

    const movie = await Movies.create({
      imagem, titulo, descricao, duracao, faturamento
    });
    res.json(movie);
    
    } catch (error) {
      return res.status(400).json({ error: `Titulo já ou nome da imagem já cadastrados.` });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const movies= await Movies.findAll()
      
      for(c=0; c<movies.length;c++){ 
        if(movies[c].titulo==req.body.titulo){
          return res.status(400).json({ error:'Este título já está cadastrado'} );
        }
      }
      const movie = await Movies.findByPk(id);

      movie.update(req.body);

      return res.json(movie);
    } catch (error) {
      return res.status(400).json({ error: 'Erro desconhecido' });
    }
  },
  async search(req, res) {
    try {
      const { titulo } = req.params;
      const movies= await Movies.findAll()
      var finalMovies=[]
      for(c=0; c<movies.length;c++){
        
        if(Functions.simplify(movies[c].titulo).startsWith(Functions.simplify(titulo))){
          finalMovies.push(movies[c].id)
        }
      }
      const { page=1 }= req.query;
      const options = {
        page, // Default 1
        paginate: 10, // Default 25
        where: {id:finalMovies}
      }
      
      const movies2= await Movies.paginate(options)
      return res.json(movies2);
    } catch (error) {
      return res.status(400).json( error );
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const movies = await Movies.findByPk(id);

      const { nome } = movies;

      movies.destroy();

      return res.json({ success: `${nome} does not exist anymore :)` });
    } catch (error) {
      return res.status(400).json({ error: `Oops, user not found, my friend :(` });
    }
  },
};
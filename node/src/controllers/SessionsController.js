const Sessions = require( '../models/sessions');
const Rooms = require( '../models/rooms');
const Movies = require( '../models/movies');
const Functions = require( '../../functions');

module.exports = {
  async index(req, res) {
    try {
      const { page=1 }= req.query;
      const options = {
        page, // Default 1
        paginate: 10, // Default 25
        include: [{association: 'movies' }, {association: 'rooms'}]
        
      }
      
        const sessions = await Sessions.paginate(options);
        
        
        if(!sessions){
          return res.status(400).json({ error: `There's no sessions, my friend :(` });
        }
    
        return res.json(sessions);
    } catch (error) {
      return res.status(400).json({ error: `There's no sessions, my friend :(` });
    }
  },

  async store(req, res) {
    try {
        const {data, horario, animacao, audio, movie_id, room_id} = req.body;
        console.log(data)
        if(Functions.confereRealizado(horario,data)){
          return res.status(400).json({ error: 'Você só pode criar sessões para datas futuras' });
        }
        const movie = await Movies.findByPk(movie_id);
        const room = await Rooms.findByPk(room_id);
        const horarioFinal = Functions.somaHoras(horario,movie.duracao)
        const validate = await Functions.sessionSala(room_id, horario,horarioFinal,data)
        if(validate==true){
          if (!movie) {
            return res.status(400).json({ error: 'Movie not found' });
          }
        
        if (!room) {
          return res.status(400).json({ error: 'Room not found' });
        }
        const faturamento="0.00"
        const status=1
        
        const session = await Sessions.create({
          data,
          horario,
          horarioFinal,
          animacao, 
          audio,
          movie_id,
          room_id,
          faturamento,
          status
        });
    
        return res.json(session);
        }else{
          return res.status(400).json({ error: 'Horário ocupado' });
        }
        
    } catch (error) {
      return res.status(400).json({ error: `Oops, something went wrong :(` });
    }
  },
  async search(req, res) {
    try {
      const { text } = req.params;
      const sessions= await Sessions.findAll(
        {include: [{association: 'movies' }, {association: 'rooms'}]}
      )
      var finalSessions=[]
      for(c=0; c<sessions.length;c++){
        
        if(Functions.simplify(sessions[c].movies.titulo).indexOf(Functions.simplify(text))!==-1){
          finalSessions.push(sessions[c].id)
        }
      }
      const { page=1 }= req.query;
      const options = {
        page, // Default 1
        paginate: 10, // Default 25
        where: {id:finalSessions},
        include: [{association: 'movies' }, {association: 'rooms'}]
      }
      
      const sessions2= await Sessions.paginate(options)
      return res.json(sessions2);
    } catch (error) {
      return res.status(400).json( error );
    }
  },
  async delete(req, res) {
    // try {
      const { id } = req.params
      const session = await Sessions.findByPk(id);
      const {data,horario,horarioFinal, movie_id, animacao, audio} =session;
      const validate = Functions.dezDias(data);
      

      if(validate== true){
      const notificacao = await Functions.notificacao(id, data, horario, horarioFinal,movie_id, animacao, audio);
      if(notificacao==true){
        session.destroy();
      return res.json({ success: `session does not exist anymore :)` });
      }else{
        return res.status(400).json({ error: 'Houve um problema ao enviar a notificação para o usuario' });
      }
      }else{
        return res.status(400).json({ error: 'Você só pode apagar uma sessão 10 dias antes da sua data' });
      }
      
    // } catch (error) {
    //   return res.status(400).json({ error: `Erro ao deletar` });
    // }
  },
};
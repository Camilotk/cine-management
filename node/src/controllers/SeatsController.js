const Seats = require( '../models/seats');
const Users = require( '../models/users');
const Sessions = require( '../models/sessions');
const Functions = require( '../../functions');

module.exports = {
  async index(req, res) {
    try {
        const seats = await Seats.findAll({
            include: [{association: 'users' }, {association: 'sessions'}]
          });
          return res.json(seats);
    } catch (error) {
      return res.status(400).json({ error: `There's no rooms, my friend :(` });
    }
  },

async show(req, res) {
    try {
      const { id } = req.params;
      const seats = await Seats.findByPk(id, {
        include: [{association: 'users' }, {association: 'sessions'}]
      });
      return res.json(seats);
    } catch (error) {
      return res.status(400).json( error );
    }
  },

  async store(req, res) {
    try {
        const {user_id, refAssentos, session_id} = req.body;
        
        const user = await Users.findByPk(user_id);
        const session = await Sessions.findByPk(session_id);
        const validate = await Functions.confereAssentos(refAssentos, session_id)
        if(validate==true){
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
          }
        
        if (!session) {
          return res.status(400).json({ error: 'Session not found' });
        }
        const qntAssentos= refAssentos.length
        const seat = await Seats.create({
            user_id,
            qntAssentos,
            refAssentos, 
            session_id
        });
    
        return res.json(seat);
    }else{
        return res.status(400).json({ error: 'Assento ocupado' });
    }
    } catch (error) {
      return res.status(400).json({ error: `Oops, something went wrong :(` });
    }
  },

};
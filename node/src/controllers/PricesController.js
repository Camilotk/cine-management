const Prices = require('../models/prices')

module.exports = {
  

  async update(req, res) {
    try {
      const {id} = req.params
      const prices = await Prices.findByPk(id);
      prices.update(req.body);
      return res.json(prices);
    } catch (error) {
      return res.status(400).json({ error: `Oops, something went wrong :(` });
    }
  },

};
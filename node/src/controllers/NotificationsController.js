const Notifications = require('../models/notifications')

module.exports = {
  

  async update(req, res) {
    try {
      const {id, status} = req.body;
      const notifications = await Notifications.findByPk(id);
      notifications.update(status);
      return res.json(notifications);
    } catch (error) {
      return res.status(400).json({ error: `Oops, something went wrong :(` });
    }
  },

};
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Movies = require('../src/models/movies');
const Rooms = require('../src/models/rooms');
const Users = require('../src/models/users');
const Sessions = require('../src/models/sessions');
const Seats = require('../src/models/seats');
const Notifications = require('../src/models/notifications');
const Prices = require('../src/models/prices');

const connection = new Sequelize(dbConfig);

Movies.init(connection);
Rooms.init(connection);
Users.init(connection);
Sessions.init(connection);
Seats.init(connection);
Notifications.init(connection);
Prices.init(connection);


Movies.associate(connection.models);
Rooms.associate(connection.models);
Users.associate(connection.models);
Sessions.associate(connection.models);
Seats.associate(connection.models);
Notifications.associate(connection.models);
module.exports = connection;
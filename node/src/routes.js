const { Router } = require('express');
const multer = require("multer");
const multerConfig = require("../config/multer");
const routes = Router();

const UsersController = require('./controllers/UsersController');
const RoomsController = require('./controllers/RoomsController');
const MoviesController = require('./controllers/MoviesController');
const SessionsController = require('./controllers/SessionsController');
const SeatsController = require('./controllers/SeatsController');
const NotificationsController = require('./controllers/NotificationsController');
const PricesController = require('./controllers/PricesController');

routes.get('/users', UsersController.index); 
routes.get('/allUsers', UsersController.allIndex); 
routes.get('/relUsers', UsersController.relIndex);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.store);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);
routes.get('/userSearch/:nome', UsersController.search);
routes.post("/profilePost", multer(multerConfig).single("file"), async (req, res) => {
    res.json(req.file)
    });

routes.get('/rooms', RoomsController.index); 
routes.get('/allrooms', RoomsController.indexAll); 
routes.get('/rooms/:id', RoomsController.show);
routes.post('/rooms', RoomsController.store);
routes.put('/rooms/:id', RoomsController.update);
routes.delete('/rooms/:id', RoomsController.delete);
routes.get('/roomSearch/:nome', RoomsController.search);


routes.get('/movies', MoviesController.index); 
routes.get('/relMovies', MoviesController.relIndex); 
routes.get('/allmovies', MoviesController.indexAll);
routes.get('/movies/:id', MoviesController.show);
routes.post('/movies', MoviesController.store);
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
res.json(req.file)
});
routes.put('/movies/:id', MoviesController.update);
routes.delete('/movies/:id', MoviesController.delete);
routes.get('/movieSearch/:titulo', MoviesController.search);

routes.get('/sessions', SessionsController.index); 
routes.post('/sessions', SessionsController.store);
routes.delete('/sessions/:id', SessionsController.delete);
routes.get('/sessionSearch/:text', SessionsController.search);

routes.get('/seats', SeatsController.index); 
routes.get('/seats/:id', SeatsController.show);
routes.post('/seats', SeatsController.store);

routes.put('/notifications/:id', NotificationsController.update);
routes.get('/notifications/:id', NotificationsController.index);
routes.put('/prices/:id', PricesController.update);
module.exports = routes;
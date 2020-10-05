const express = require('express');
const routes = require('./routes.js');
const cors = require("cors")
const Functions = require ('../functions.js')
require('../database')
setInterval(function(){
    Functions.attFaturamentos()
},60000)
Functions.criaPreco()
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
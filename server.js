require('dotenv').config();
var express = require('express'),
app = express(),
port = process.env.PORT,
mongoose = require('mongoose'),
playerModel = require('./api/models/player'),
enemyModel = require('./api/models/enemy'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/playerRoutes');
routes(app);
routes = require('./api/routes/enemiesRoutes');
routes(app);
routes = require('./api/routes/enemyRoutes');
routes(app);

app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found i guess'})
});

console.log('Shooter RESTful API server started on: ' + port);


require('dotenv').config();
var express = require('express'),
app = express(),
port = process.env.PORT,
mongoose = require('mongoose'),
playerModel = require('./api/models/player'),
enemyModel = require('./api/models/enemy'),
bodyParser = require('body-parser');
var path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB);

                            //this we use for images style sheets or fonts that will be static
app.set('view engine', 'pug');

var dir = path.join(__dirname, 'public');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/playerRoutes');
routes(app);
routes = require('./api/routes/enemiesRoutes');
routes(app);
routes = require('./api/routes/enemyRoutes');
routes(app);

app.listen(port);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        enemy: enemy.profiles               //this adds the people to the site
      });
  });

  app.get('/profile', (req, res) => {           //we use this for the second part of the page we we have detailed info for each person
    const enemy = enemy.findOne({_id: req.params.id}, function(err, enemy){
      if (err) {
          res.json(err);
      }
      else if (!enemy) {
          res.json("Enemy doesn't exists.");
      }
      else{
        res.render('profile', {
          title: `About ${enemy.name}`,
          enemy:enemy.profile
        });
      }
  })});
    

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found i guess'})
});

console.log('Shooter RESTful API server started on: ' + port);


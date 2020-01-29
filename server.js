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

                            //this we use for images style sheets or fonts that will be static
app.set('view engine', 'pug');

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
        people: people.profiles               //this adds the people to the site
      });
  });

  app.get('/profile', (req, res) => {           //we use this for the second part of the page we we have detailed info for each person
    const person = people.profiles.find(p => p.id === req.query.id);
    res.render('profile', {
      title: `About ${person.firstname} ${person.lastname}`,
      person,
    });
  });

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found i guess'})
});

console.log('Shooter RESTful API server started on: ' + port);


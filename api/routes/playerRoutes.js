'use strict';

module.exports = function(app){
    var playerController = require('../controllers/playerController');

    app.route('/login').post(playerController.login);
    
    app.route('/register').post(playerController.register);
    
    app.route('/players').get(playerController.list_all_players);
}
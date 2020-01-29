'use strict';

module.exports = function(app){
    const enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/enemies').get(tokenAuthenticator.authenticate, enemyController.list_all_enemies);
}
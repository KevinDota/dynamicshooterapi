'use strict';

module.exports = function(app){
    var enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');

    app.route('/enemy').post(tokenAuthenticator.authenticate, enemyController.create_enemy);
    app.route('/enemy/getByName/:name').get(tokenAuthenticator.authenticate, enemyController.get_enemy_by_name);
    app.route('/enemy/:id')
        .get(tokenAuthenticator.authenticate, enemyController.get_enemy)
        .put(tokenAuthenticator.authenticate, enemyController.update_enemy)
        .delete(tokenAuthenticator.authenticate, enemyController.delete_enemy);
}
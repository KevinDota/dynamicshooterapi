'use strict';

module.exports = function(app){
    const enemyController = require('../controllers/enemyController');


    app.route('/enemies').get(enemyController.list_all_enemies);
}
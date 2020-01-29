'use strict';

module.exports = function(app){
    var enemyController = require('../controllers/enemyController');
    const tokenAuthenticator = require('../middleware/tokenAuthenticator');
    var multer = require('multer');

    var save = multer.diskStorage({
        destination: function (req, file, pos) {
            pos(null, './public/images')
        },
        filename: function (req, file, pos) {
            var imgPath = Date.now() + file.originalname;
            pos(null, imgPath)
        }
    });

    const check = (req, file, pos) => {
        if (file.type === 'image/png') {
            pos(null, true);
        } else {
            pos(null, false);
        }
    };
    let upload = multer({save: save, check: check});

    app.route('/enemy').post(tokenAuthenticator.authenticate, enemyController.create_enemy);
    app.route('/enemy/getByName/:name').get(tokenAuthenticator.authenticate, upload.single('image'), enemyController.get_enemy_by_name);
    app.route('/enemy/:id')
        .get(tokenAuthenticator.authenticate, enemyController.get_enemy)
        .put(tokenAuthenticator.authenticate, enemyController.update_enemy)
        .delete(tokenAuthenticator.authenticate, enemyController.delete_enemy);
}
'use strict';

var mongoose = require('mongoose'),
  Player = mongoose.model('Player');

exports.list_all_players = function(req, res){
    Player.find({}, function(err, player){
        if (err) {
            res.json(err);
        }
        res.json(player);
    });
}

exports.register = function(req, res){
    var new_player = new Player(req.body);
    new_player.setPassword(req.body.password);

    new_player.save(function(err, player) {
        if (err) {
            res.json(err);
        }
        res.json("Player registered!");
    });
}

exports.login = function(req, res){
    
    Player.findOne({name: req.body.name}, function(err, player) {
        if (err) {
            res.json(err);
        }
        if (!player || !player.validatePassword(req.body.password)) {
            res.json("Wrong username or password!");
        }
        else {
            var token = player.generateAuthToken();
            res.json({token: token});
        }
    });
}

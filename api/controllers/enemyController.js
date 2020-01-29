'use strict';

var mongoose = require('mongoose'),
  Enemy = mongoose.model('Enemy');

exports.create_enemy = function (req, res) {
    var new_enemy = new Enemy(req.body);

    new_enemy.save(function(err, enemy){
        if (err) {
            res.send(err);
        }
        res.json(enemy);
    });
}

exports.get_enemy_by_name = function (req, res) {
    Enemy.findOne({name: req.params.name}, function(err, enemy){
        if (err) {
            res.json(err);
        }
        else if (!enemy) {
            res.json("Enemy doesn't exists.");
        }
        else{
            res.json(enemy);
        }
    });
}

exports.get_enemy = function (req, res) {
    Enemy.findOne({_id: req.params.id}, function(err, enemy){
        if (err) {
            res.json(err);
        }
        else if (!enemy) {
            res.json("Enemy doesn't exists.");
        }
        else{
            res.json(enemy);
        }
    });
}

exports.update_enemy = function (req, res) {
    Enemy.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, enemy) {
        if (err){
            res.send(err);
        }
        else{
            res.json(enemy);
        }
      });
}

exports.delete_enemy = function (req, res) {
    Enemy.remove({_id: req.params.id}, function(err, enemy) {
        if (err){
          res.send(err);
        }else{
            res.json({ message: 'Enemy deleted' });
        }
    });
}

exports.list_all_enemies = function (req, res) {
    Enemy.find({}, function(err, enemy) {
        if (err) {
            res.json(err);
        }else {
            res.render('index', {
                title: 'Enemies of the Shooting Stars',
                enemies: enemy
            });
        }
    });
}
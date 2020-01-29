'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var playerSchema = new schema({
    name: {
        type: String,
        require: true,
        index: {unique:true}
    },
    password: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
        type: String,
        required: true
        }
        }]
       
});

playerSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(32).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

playerSchema.methods.validatePassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === hash;
};

playerSchema.methods.generateAuthToken = function() {
    const player = this;
    const token = jwt.sign({name: player.name}, process.env.JWT_KEY);
    player.tokens = player.tokens.concat({token});
    player.save();
    return token;
};
   

module.exports = mongoose.model('Player', playerSchema);
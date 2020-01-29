'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var enemySchema = new schema({
    name: {
        type: String,
        require: true
    },
    health: {
        type: Number,
        require: true
    },
    positionX: {
        type: Number,
        require: true
    },
    positionY: {
        type: Number,
        require: true
    }  
});

module.exports = mongoose.model('Enemy', enemySchema);
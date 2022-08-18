const mongoConfig = require('../configs/mongodb.json')

const mongoose = require('mongoose')

mongoDB = mongoConfig.urlAllow
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise

var db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const schemaTracks = new mongoose.Schema({event: 'string', url: 'string', title: 'string', 'tl': 'date', tags: [{type: String}]})
const tracks = mongoose.model('tracks', schemaTracks)

var dbModels = {tracks}

module.exports = {
    db,
    dbModels
}
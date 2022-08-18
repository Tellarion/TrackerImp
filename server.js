const express = require('express')
const appPublic = express()
const httpPublic = require('http').createServer(appPublic)
const appApi = express()
const httpApi = require('http').createServer(appApi)
const bodyParser = require("body-parser")

const cors = require("cors")
const path = require('path')

const appConfig = require('./src/configs/app.json')

console.log(`TrackerImp TellarionHub for HR`)

appPublic.use(cors())
appPublic.use(bodyParser.json())
appPublic.use(bodyParser.urlencoded({ extended: true}))

appPublic.use(function(req, res, next) {
  
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Language")

  console.log(`[REQUEST ON PUBLIC]: ${req.method}`)

  next()

})

appApi.use(cors())
appApi.use(bodyParser.json())
appApi.use(bodyParser.urlencoded({ extended: true}))

appApi.use(function(req, res, next) {
  
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Language")
  
    console.log(`[REQUEST ON API]: ${req.method}`)
  
    next()

})

require('./src/routes/public')(appPublic)
require('./src/routes/api')(appApi)

httpPublic.listen(appConfig.publicPort, function() {
    console.log('Express [PUBLIC] server listening on port ' + appConfig.publicPort)
})

httpApi.listen(appConfig.apiPort, function() {
    console.log('Express [API] server listening on port ' + appConfig.apiPort)
})  

module.exports = [appPublic, appApi]
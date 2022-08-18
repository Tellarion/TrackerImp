const path = require('path')

const {db, dbModels} = require('../mongodb/index')

module.exports = function(appApi) {

    appApi.get('/', [], function(req, res) {
        res.sendFile(path.join(__dirname + '../../remote/index.js'))
    })

    appApi.post('/track', [], function(req, res) {

        let rData = req.body
        dbModels.tracks.insertMany(rData).then(() => {
            console.log('record create')
        })
        res.status(200).send({status: true})
    })

}
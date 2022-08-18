const path = require('path')

module.exports = function(appPublic) {

    appPublic.get('/', [], function(req, res) {
        res.sendFile(path.join(__dirname + '../../../src_front/html/index.html'))
    })

    appPublic.get('/1.html', [], function(req, res) {
        res.sendFile(path.join(__dirname + '../../../src_front/html/1.html'))
    })

    appPublic.get('/2.html', [], function(req, res) {
        res.sendFile(path.join(__dirname + '../../../src_front/html/2.html'))
    })

}
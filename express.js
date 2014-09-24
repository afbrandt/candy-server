var express = require('express'),
  mongoskin = require('mongoskin'),
  bodyParser = require('body-parser')

var app = express()

app.use(bodyParser())

var db = mongoskin.db('mongodb://@localhost:27017/candy-server', {safe:true})

app.get('/', function(req, res) {
  res.send('chat is up, try /chat')
})

app.get('/chat', function(req, res) {
  db.collection('chat').find({}, {limit:10, sort: [['_id', -1]]}).toArray(function(e, results) {
    if (e) return next()
    res.send(results)
  })
})

app.post('/chat', function(req, res) {
  db.collection('chat').insert(req.body, {}, function(e, results){
    if (e) return next(e)
    res.send(results)
  })
})

app.listen(3000)

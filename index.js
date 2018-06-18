const http = require('http')
const express = require ('express')
const port = 3000
const app = express();
const MongoClient = require('mongodb').MongoClient
var bodyParser = require("body-parser");
var db;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  var body = req.body;
  db.collection('votes').save(body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
    res.send({});
  })
})

app.put('/', (req, res) => {
  var body = req.body;
  var query = { id: body.id };
  var value = { $inc: { [`answers.${body.answerId}.voted`]: 1, voted: 1 }};

  db.collection('votes').updateOne(query, value, (err, result) => {
    if (err) return console.log(err);
    res.send({});
  })
})

app.get('/', (req, res) => {
  db.collection('votes').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send({votes: result});
  })
})

const dbUrl = "mongodb://murdoc:d77_deVil@ds257590.mlab.com:57590/votes";
MongoClient.connect(dbUrl, (err, client) => {
  if (err) return console.log(err)
  db = client.db('votes')

  app.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
  
    console.log(`server is listening on ${port}`)
  })
})






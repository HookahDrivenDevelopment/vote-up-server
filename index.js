const http = require('http')
const express = require ('express')
const port = 3000
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const requestHandler = (request, response) => {
  console.log(request.url);
  console.log(request.method);
  console.log(request);
  response.end('Hello Node.js Server!');
}

app.get('/govno', (req, res, next)=>{
  res.send({gonvo:"govno"})
})

app.get('/*', (req, res, next)=>{
  res.send({a:"govno"})
})

app.post('/', (req, res, next) => {
  var body = req.body;
  console.log("body = ", body);
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
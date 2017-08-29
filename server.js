var AWS = require("aws-sdk");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const pool = require('./post.js');


getFiles = function(clase){
  return new Promise(function(resolve, reject){
    pool.queryGetLinks(clase)
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      console.err('error getFiles in server.js '  + err)
      reject(err)
    })
  })
};

postFile = function(propItem){
  return new Promise(function(resolve, reject){
    pool.queryPostLink( propItem.link , propItem.titulo , propItem.clase )
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject(err)
    })
  })
};

app.get('/archivo/:clase', function(req, res){
  getFiles(req.params.clase).then(data => res.send(data))
})

app.get('/clases/:carrera', function(req, res){
  res.sendFile(__dirname + '/materias/'+ req.params.carrera + '.json');
})

app.post('/archivo/:clase', function(req, res){
  console.log(req.params.clase)
  var propItem = JSON.parse(Buffer.from(req.params.clase, 'base64'));
  postFile(propItem)
  .then(data => res.send(data))
  .catch(err => res.send('err' +  err ))
});

app.get('/assets/:something', function(req, res){
  res.sendFile(__dirname + '/assets/' + req.params.something);
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});







app.listen(1212, function () {
  console.log('Listening on port 1212')
})

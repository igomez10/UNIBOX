var AWS = require("aws-sdk");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const pool = require('./post.js');
var request = require('request');
var cheerio = require('cheerio');
var atob = require('atob')
var getTable = function (tableName) {
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM '+ tableName, function (err, res) {
      if (err) {
        reject(err);
      }
      else {
        resolve(res);
      }
    })
  }
)
};

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


app.get('/link/:anonlink', function(req, res){
  var anonlink = atob(req.params.anonlink);

  request( anonlink , function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $('a.btn-primary').each(function(i, element){
        res.send(element.attribs.href);
      })
    }
    else{
      console.log('error de GET /link/:anonlink');
      res.send('')
    }
  });

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

var AWS = require("aws-sdk");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const pool = require('./post.js');


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
    pool.query('SELECT TITULO, LINK FROM ARCHIVOS WHERE CLASE=' +"'" + clase + "'", function(err, res){
      if(err){
        reject(err);
      }
      else{
        resolve(res);
      }
    })
  })
}

postFile = function(propItem){
  return new Promise(function(resolve, reject){
    pool.query('INSERT INTO ARCHIVOS (link, titulo, clase) VALUES(' + "'" + propItem.link + "','" + propItem.titulo + "','" + propItem.clase + "')", function(err, res){
      if(err){
        reject(err);
      }
      else{
        resolve('sepudo');
      }
    })
  })
}



app.get('/archivo/:clase', function(req, res){
  getFiles(req.params.clase)
  .then((data) => res.send(data.rows) )
  .catch((err) => res.send('error en get archivo/:clase' + err) )
})

app.get('/clases/:carrera', function(req, res){
  res.sendFile(__dirname + '/materias/'+ req.params.carrera + '.json');
})

app.post('/archivo/:clase', function(req, res){
  console.log(req.params.clase)
  var propItem = JSON.parse(Buffer.from(req.params.clase, 'base64'));
  // res.send(propItem.titulo)
  postFile(propItem)
  .then(data => res.send(data))
  .catch(err => res.send('err' +  err ))
})




app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
})




app.listen(1212, function () {
  console.log('Listening on port 1212')
})

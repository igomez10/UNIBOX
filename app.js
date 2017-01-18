var express = require('express');
var apps = express();

var path = require('path');
var formidable = require('formidable');
var fs = require('fs')


// __dirname siginifica el nombre del root.
console.log("estoy poniendo el __dirname")
apps.use(express.static(__dirname));

apps.get('/', function(req, res){
  console.log("ME ESTA PIDIENDO EL /")
  res.sendFile(path.join(__dirname, '/index.html'));
})


apps.post('/uploads', function(req, res){
  var form = new formidable.IncomingForm();

  form.multiples = true; //permite subir muchos archivos simultaneamente

  form.uploadDir = path.join(__dirname, '/uploads'); //nos guarda todo en la carpeta uploads TO DO CAMBIAR A ~ROUTE PARAMS

  //le cambio el nombre al archivo original, se puede personalizar
  form.on( 'file' , function(field, file){
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  //log de los errores
  form.on( 'error' , function(err){
    console.log('An error has occurred: \n' + err);
  });

  //cuando todo se temrina de subir se envia una respuesta al cliente
  form.on( 'end' , function(){
    res.end('success');
  })

  //parsear el pedido conteniendo el form data
  form.parse(req);
});
const port = 30000
var server = apps.listen(port, function(){
  console.log('server listening on port ' + port);
});

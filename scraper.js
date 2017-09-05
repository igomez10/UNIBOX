var request = require('request');
var cheerio = require('cheerio');
request('https://anonfile.com/Wbj1kbc3bf', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('a.btn-primary'  ).each(function(i, element){
      console.log(element.attribs.href);
    })
  }
});

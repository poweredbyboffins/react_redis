var http = require('http');
var util = require('util');
const fetch = require("node-fetch");

var options = {
  host: 'localhost',
  port: 5000,
  path: '/nodes',
  method: 'GET'
};

/* async/await with node-fetch */
var json;

async function getData(url,url2,json) {
  try {
    var response = await fetch(url);
    json = await response.json();
    if (url2)
    {
    response = await fetch(url2);
    const json2 = await response.json();
    var json3=json.concat(json2)
    console.log(json3);
    } else console.log(json)
  } catch (error) {
    console.log(error)
  }
};
options.path='/nodes'
var url = 'http://'+options.host+':'+options.port+options.path;
options.path='/industry'
const url2 = 'http://'+options.host+':'+options.port+options.path;
getData(url,url2,json)
options.path='/links'
url = 'http://'+options.host+':'+options.port+options.path;
getData(url,json)

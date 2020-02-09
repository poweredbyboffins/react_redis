var http = require('http');
var util = require('util');
const fetch = require("node-fetch");

var options = {
  host: 'localhost',
  port: 5000,
  path: '/nodes',
  method: 'GET'
};

/* define a callback function
 *
 */

function getdata(callback)
{
http.request(options, function(res) {
//  console.log('STATUS: ' + res.statusCode);
//  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    //console.log('BODY: ' + chunk);
    callback(chunk)
  });
}).end();
};

/* handler which processes the callback
*
*/
function myHandler(result) {
    // code that depends on `result`
    console.log(result);
}
/* invoke the function */
//getdata(myHandler);

/* async/await with node-fetch */
const url = 'http://'+options.host+':'+options.port+options.path;
var json2;
/*
const getData = async url => {
  try {
    const response = await fetch(url);
    json = await response.json();
  } catch (error) {
  }
  return json
};
*/

async function getdata(){
    return await fetch(url)
    .then(res => res.json())
}

console.log(json2);


/*

var options = {
  host: 'localhost',
  port: 5000,
  path: '/links',
  method: 'GET'
};

http.request(options, function(res) {
//  console.log('STATUS: ' + res.statusCode);
//  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();
*/

var http = require('http');
var util = require('util');
const fetch = require("node-fetch");

var options = {
  host: 'localhost',
  port: 5000,
  path: '/industry',
  method: 'GET'
};

/* define a callback function
 *
 */

function getdata(callback,opt)
{
http.request(opt, function(res) {
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
function myHandler(results) {
    // redis object convert to json to get
   // array indexes to work
    json=JSON.parse(results);
    var columns = json[0];
    var data = json[1];
    var dataarray = []
        for (var i=0; i < data.length; i++)
        {
          var element = {}
          // loop each element of a single record array
          for (var j in columns )
          {
          element[columns[j]]=data[i][j];
          }
        dataarray.push(element)
        }
    json=JSON.stringify(dataarray);
    console.log(json)
}
/* invoke the function */
options.path='/nodes'
getdata(myHandler,options);
options.path='/industry'
getdata(myHandler,options);



/*jslint node: true */
'use strict';

require('babel-register');
var ReactDom=require('react-dom/server');

// Get dependencies

var express = require('express');
var app = express();
//var compression = require('compression');
var port = process.env.PORT || 5000;
var base_url = process.env.BASE_URL || 'http://localhost:5000';
var hbs = require('hbs');
//var morgan = require('morgan');
var React = require('react');
var Tweets = React.createFactory(require('./components/tweets2.jsx'));

// Set up connection to Redis
var redis, subscribe;
if (process.env.REDIS_URL) {
  redis = require('redis').createClient(process.env.REDIS_URL);
  subscribe = require('redis').createClient(process.env.REDIS_URL);
} else {
  var r = require('redis')
  redis=r.createClient();
  subscribe = require('redis').createClient();
}

r.add_command('graph.query');

// Set up templating
app.set('views', __dirname + '/views');
app.set('view engine', "hbs");
app.engine('hbs', require('hbs').__express);

// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Set up logging
//app.use(morgan('combined'));

// Compress responses
//app.use(compression());

// Set URL
app.set('base_url', base_url);

// Serve static files
app.use(express.static(__dirname + '/static'));

var key='EQUITY_ANALYSIS';
var query1='MATCH (n:stocks )-[r:revenue_stream]->(i:industry)  RETURN n.Company,i.Industry,r.Stream_revenue';
var query2='MATCH (n:stocks )  RETURN n.Company';
var query3='MATCH (n:industry )  RETURN n.Industry';

// Render main view
app.get('/links', function (req, res) {
  redis.graph_query(key, query1, function (err, results) {
      arraytojson(res,results)
      //res.status(200).send(results)
  });
});
app.get('/nodes', function (req, res) {
  redis.graph_query(key, query2, function (err, results) {
      arraytojson(res,results)
      //res.status(200).send(results)
  });
});

async function arraytojson(res,results) {
try {
    //var json=await JSON.parse(results);
    var json=results;
    var columns = json[0];
    console.log(columns);
    var data = json[1];
    console.log(data);
    console.log(data.length);
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
    console.log(dataarray);
    json=JSON.stringify(dataarray);
    await res.status(200).send(json)
    } catch(error) {
      console.log(error)
    }
}

app.get('/industry', function (req, res) {
  redis.graph_query(key, query3, function (err, results) {
      arraytojson(res,results)
      //res.status(200).send(results)
  });
});

// Listen
var io = require('socket.io')({
}).listen(app.listen(port));
console.log("Listening on port " + port);

// Handle connections
io.sockets.on('connection', function (socket) {
  // Subscribe to the Redis channel
  subscribe.subscribe('tweets');

  // Handle receiving messages
  var callback = function (channel, data) {
    socket.emit('message', data);
  };
  subscribe.on('message', callback);

  // Handle disconnect
  socket.on('disconnect', function () {
    subscribe.removeListener('message', callback);
  });
});

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
var query='MATCH (n:stocks )-[r:revenue_stream]->(i:industry)  RETURN n.Company,i.Industry,r.Stream_revenue';

// Render main view
app.get('/', function (req, res) {
  // Get tweets
  //redis.lrange('stream:tweets', 0, -1, function (err, tweets) {
  redis.graph_query(key, query, function (err, results) {
    /*if (err) {
      console.log(err);
    } else {
      // Get tweets
      var tweet_list = [];
      let row=''
      data.forEach(function (row, i) {
        console.log(data[i])
        tweet_list.push(data[i].toString());
      });
    */
      // Render page
      //res.status(200).send(tweet_list)
      res.status(200).send(results)
    //}
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

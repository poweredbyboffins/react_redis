const
  express = require('express'),                                                     // the Express HTTP framework
  app = express(),
  redis = require('redis'),
  _ = require('lodash'),
  argv = require('yargs')
    .default('p', 6379)
    .default('h', '127.0.0.1')
    .argv;

require('express-ws')(app);                                                               // Allows Express to handle websockets
let client = redis.createClient({ port: argv.p, password: argv.P, host: argv.h });

redis.add_command('graph.query');                                       // add in the GRAPH.QUERY command since it's a module and not automatically incuded in node_redis


app.ws('/query/:windowId', function (ws) {                                                    // control plane web socket events
  "use strict";
  console.log('established')
  ws.on('message', function (sentJson) {
    sentJson = JSON.parse(sentJson);
    console.log('Query', sentJson);
    client.graph_query(sentJson.key, sentJson.query, function (err, results) {
      if (err) {
        console.log('err');
        ws.send(JSON.stringify({
          status: 'error',
          message: 'Redis Error: ' + String(err)
        }));
      } else {
        let data = results[1];
        let columns = results[0];
        let dataObjects = [];
        // unsure what this is meant to be doing
        for (let i = 1; i < data.length; i += 1) {
          dataObjects.push(_(columns)
            .zip(data[i])
            .chunk(sentJson.chunkSize)
            .value()
          );
          console.log(data[i])
        }
        ws.send(JSON.stringify({
          status: 'ok',
          results: data,
          columns: columns
        }, null, 2));
      }
    });
  });
});


app.use('/', express.static(__dirname + '/'));
app.listen(4000);                                                                                       // our server app

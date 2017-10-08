/*
NodeJS CMX Receiver

A basic web service to accept CMX data from a Cisco Meraki network
- Accept a GET request from Meraki and respond with a validator
- Meraki will POST to server, if validated.
- POST will contain a secret, which can be verified by the server.
- JSON data will be in the req.body.data. This will be available in the cmxData function's data object.

-- This skeleton app will only place the data received on the console. It's up to the developer to use this how ever required

*/

// CHANGE THESE CONFIGURATIONS to match your CMX configuration
var port = 1890;
var secret = "meraki";
var validator = "c8b77133f4bd2218df387186212a6e946d5b4207";
var route = "/cmx";
var path = require('path');
// Express Server
var express = require('express');
// Required for CORS. Without it, socket throws error
var cors = require('cors');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);//, {origins:"*:*"});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:1890'}));
app.use(function(request, response, next) {
 response.header("Access-Control-Allow-Origin", "*");
 response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

server.listen(1891);

// All CMX JSON data will end up here. Send it to a database or whatever you fancy.
// data format specifications: https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#Version_2.0
function cmxData(data) {
    var observations = data.observations;
    var locationsArray = [];
    var sumX = 0;
    var sumY = 0;
    var countX = 0;
    var countY = 0;

    observations.forEach(function(observation) {
        var jsonData = [];
        jsonData.push(observation.location.lat);
        jsonData.push(observation.location.lng);
        if (!isNaN(jsonData[0])  && !isNaN(jsonData[1])) {
          // sumX += jsonData[0];
          // sumY += jsonData[1];
          // countX += 1;
          // countY += 1;
          jsonData[0] += 0.0013;
          jsonData[1] += 0.0009;
          locationsArray.push(jsonData);
        }
    }, locationsArray, sumX, sumY, countX, countY);

    // console.log("Average X: " + sumX/countX);
    // console.log("Average Y: " + sumY/countY);
    // if locationsArray is not empty, trigger an event
    if (locationsArray.length > 0) {
        io.emit('update', {locations: locationsArray});
    }

};

// // CMX Location Protocol, see https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#API_Configuration
// //
// // Meraki asks for us to know the secret
app.get(route, function (req, res) {
    console.log("Validator = " + validator);
    res.status(200).send(validator);
});
// //
// // Getting the flow of data every 1 to 2 minutes
app.post(route, function (req, res) {
    if (req.body.secret == secret) {
        console.log("Secret verified");
        cmxData(req.body.data);
    } else {
        console.log("Secret was invalid");
    }
    res.status(200);
});


// app.get('/indoor', function (req,res) {
//   res.sendFile(path.join(__dirname + '/indoor.html'));
// });
//
// app.post('/modifyMap', function (req,res) {
//
// });
//
// app.post('/modifyIndoor', function(req,res) {
//
// });

// Start server
app.listen(port, function () {
    console.log("CMX Receiver listening on port: " + port);
});

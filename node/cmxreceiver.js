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
var port = process.env.OVERRIDE_PORT || process.env.PORT || 1890;
var secret = process.env.SECRET || "meraki";
var validator = process.env.VALIDATOR || "c8b77133f4bd2218df387186212a6e946d5b4207";
var route = process.env.ROUTE || "/cmx";
var path = require('path');
// Express Server
var express = require('express');
var cors = require('cors');
var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server)//, {origins:"*:*"});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:1890'}));
app.use(function(request, response, next) {
 response.header("Access-Control-Allow-Origin", "*");
 response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

// app.get('*', function(req, res) {
//   res.send('<script src="/socket.io/socket.io.js"></script><script>var socket = io();socket.on("update", function(){console.log("sdfs")})</script>')
// })



io.on('connection', function(socket){
  console.log(socket.id)
  socket.emit('update', {hi: 'there'})
})

// server.listen(1891);
// server.listen(1890);

// All CMX JSON data will end up here. Send it to a database or whatever you fancy.
// data format specifications: https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#Version_2.0
function cmxData(data) {
    // console.log("JSON Feed: " + JSON.stringify(data, null, 2));
    var json = JSON.stringify(data, null, 2);
    var observations = data.observations;

    var locationsArray = [];

    observations.forEach(function(observation) {
        var jsonData = {};
        jsonData['lat'] = (observation.location.lat !== null) ? observation.location.lat : '';
        jsonData['lng'] = (observation.location.lng !== null) ? observation.location.lng : '';
        locationsArray.push(jsonData);
    }, locationsArray);

    // if locationsArray is not empty, trigger an event
    if (locationsArray.length > 0) {
        io.emit('update', {location: locationsArray});
    }

};

// CMX Location Protocol, see https://documentation.meraki.com/MR/Monitoring_and_Reporting/CMX_Analytics#API_Configuration
//
// Meraki asks for us to know the secret
app.get(route, function (req, res) {
    console.log("Validator = " + validator);
    res.status(200).send(validator);
});
//
// Getting the flow of data every 1 to 2 minutes
app.post(route, function (req, res) {
    if (req.body.secret == secret) {
        console.log("Secret verified 2");
        cmxData(req.body.data);
    } else {
        console.log("Secret was invalid");
    }
    res.status(200);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});


app.get('/indoor', function (req,res) {
  res.sendFile(path.join(__dirname + '/indoor.html'));
});

app.post('/modifyMap', function (req,res) {

});

app.post('/modifyIndoor', function(req,res) {

});

// Start server
app.listen(port, function () {
    console.log("CMX Receiver listening on port: " + port);
});

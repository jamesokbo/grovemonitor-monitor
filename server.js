var fs=require('fs');
var async= require('async');
var express =require('express');
var app=express();

var http= require('http').Server(app);
var monitorIO=require('socket.io')(http);

var mongoose= require('mongoose');
var configDB= require('./server/config/database.js');
mongoose.connect(configDB.url);

var envVariables=require('./envVariables.js');
var constants=require('./constants.js');

//MONGOOSE SCHEMAS

//Mongoose ResMonitor and its sensor readings' schemas
var Monitor=require('./server/models/monitor');
//TODO: Add Actuators arrays and schemas

//TODO: ADD SOCKETIO COMMUNICATIONS
//TODO: Add SocketIO communication protocol with the server
//-Pass requests from server to monitors
var serverSocket=require('socket.io-client')(constants.SERVER_URL);
require('./sockets/serverSocket/connection.js')(serverSocket);
require('./sockets/serverSocket/mReading.js')(serverSocket);
require('./sockets/serverSocket/changeReservoirSize.js')(serverSocket);
require('./sockets/serverSocket/editLBound.js')(serverSocket);
//TODO: Test 'editLBound' script and create 'editUBound'

//TODO: Add SocketIO communication protocol with the monitors
monitorIO.on('connection', function(monitorSocket){
  monitorSocket.monitorID='';
  require('./sockets/monitorSockets/monitorIdentification.js')(monitorSocket,serverSocket);
  require('./sockets/monitorSockets/rReading.js')(monitorSocket,serverSocket);
  require('./sockets/monitorSockets/disconnect.js')(monitorSocket,serverSocket);
});

//TODO: Add SocketIO communication protocol with the actuators

//Initialize server
Monitor.update({},{$set:{status:false}},{multi:true},function(err,res){
  if(err){
    throw err;
  }
  if(res.ok==1){
    http.listen(8080,function(){
      console.log('Monitor socketserver running @ port: 8080');
    });
  }
});

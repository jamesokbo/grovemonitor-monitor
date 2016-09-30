var fs=require('fs');
var async= require('async');
var express =require('express');
var app=express();

var http= require('http').Server(app);
var monitorIO=require('socket.io')(http1);
var serverURL='www.grovemonitor-jamesokbo.c9users.io:8081';

var mongoose= require('mongoose');
var configDB= require('./server/config/database.js');
mongoose.connect(configDB.url);

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

//TODO: Add SocketIO communication protocol with the monitors
monitorIO.on('connection', function(monitorSocket){
  monitorSocket.monID='';
  monitorSocket.monitor=new Monitor();
  
  require('./sockets/monitorSockets/identification.js')(monitorSocket);
  require('./sockets/monitorSockets/identification.js')(monitorSocket);
};

//TODO: Add SocketIO communication protocol with the actuators

Monitor.update({},{$set:{status:false}},{multi:true},function(err,res){
  if(err){
    throw err;
  }
  if(res.ok==1){
    Monitor.update({},{$set:{status:false}},{multi:true},function(err,res){
      if(err){
        throw err;
      }
      http.listen(8080,function(){
        console.log('Monitor socketserver running @ port: 8080');
      });
    });
  }
});

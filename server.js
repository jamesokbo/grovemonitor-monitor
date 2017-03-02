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
var Monitor=require('./server/models/monitor');
var Reading=require('./server/models/reading');

var mainRPiSocket=require('socket.io-client')(constants.MAINRPI_URL);
require('./sockets/serverSockets/connection.js')(mainRPiSocket);
require('./sockets/serverSockets/mReading.js')(mainRPiSocket);
require('./sockets/serverSockets/disconnect.js')(mainRPiSocket);

async.whilst(function(){return !envVariables.serverConnectionStatus},
  function(cb){
    console.log('attempting to connect');
    setTimeout(function(){
       mainRPiSocket.connect();
       cb();
    },1000); 
  }
);

//Initialize server
http.listen(8181,function(){
  console.log('Monitor running @ port: 8080');
});
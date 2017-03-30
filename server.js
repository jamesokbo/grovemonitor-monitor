var fs=require('fs');
var async= require('async');
var express =require('express');
var app=express();

var http= require('http').Server(app);
var monitorIO=require('socket.io')(http);

var mongoose= require('mongoose');
var configDB= require('./server/config/database.js');
mongoose.connect(configDB.url);

var sensorArrays=require('./server/sensorArrays.js');
var envVariables=require('./server/envVariables.js');
var constants=require('./server/constants.js');

//MONGOOSE SCHEMAS
var Monitor=require('./server/models/monitor');
var Reading=require('./server/models/reading');

var mainRPiSocket=require('socket.io-client')(constants.MAINRPI_URL, {reconnect:true});
require('./server/sockets/mainRPiSockets/connection.js')(mainRPiSocket);
require('./server/sockets/mainRPiSockets/addSensor.js')(mainRPiSocket);
require('./server/sockets/mainRPiSockets/mReading.js')(mainRPiSocket);
require('./server/sockets/mainRPiSockets/disconnect.js')(mainRPiSocket);


//Initialize server
Monitor.find({},function(err,docs){
  if(err){
    throw err;
  }
  if(docs.length>0){
    constants.MONITOR_ID=docs[0].monitorID;  
    sensorArrays.sensors=docs[0].sensors;
  }
  else{
    constants.MONITOR_ID='';
  }
});

http.listen(8181,function(){
  console.log('Monitor running @ port: 8080');
});
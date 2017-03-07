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
require('./sockets/mainRPiSockets/connection.js')(mainRPiSocket);
require('./sockets/mainRPiSockets/mReading.js')(mainRPiSocket);
require('./sockets/mainRPiSockets/disconnect.js')(mainRPiSocket);

Monitor.find({},function(err,docs){
  if(err){
    throw err;
  }
  if(docs.length>0){
    constants.MONITOR_ID=docs[0].monitorID;
  }
  else{
    constants.MONITOR_ID="";
  }
  
  
  //Initialize server
  Monitor.find({},function(err,docs){
      if(err){
        throw err;
      }
      if(docs.length>0){
        constants.MONITOR_ID=docs[0].monitorID;  
      }
      else{
        constants.MONITOR_ID='';
      }
  });
  
  async.whilst(function(){return !envVariables.mainRPiConnectionStatus},
    function(cb){
      setTimeout(function(){
         mainRPiSocket.connect();
         cb();
      },5000); 
    }
  );
});

//Initialize server
http.listen(8181,function(){
  console.log('Monitor running @ port: 8080');
});
var fs=require('fs');
var express =require('express');
var app=express();

var http1= require('http').Server(app);
var http2= require('http').Server(app);
var envMonitorIO=require('socket.io')(http1);
var resMonitorIO=require('socket.io')(http2);
var serverURL='www.grovemonitor-jamesokbo.c9users.io:8081';

var mongoose= require('mongoose');
var configDB= require('./server/config/database.js');
mongoose.connect(configDB.url);

//MONGOOSE SCHEMAS

//Mongoose ResMonitor and its sensor readings' schemas
var ResMonitor=require('./server/models/resMonitor');
var PhReading=require('./server/models/phReading');
//TODO: Missing ResMonitor Sensor readings
//TODO: Mongoose EnvMonitor and its sensor readings' schemas

//Arrays of connected monitors
var envMonitors=[];
var resMonitors=[];
var envMonitorIDs=[];
var resMonitorIDs=[];

//Environment variables
var mainIDPath='';
var connectedToServer=false;

var socketToServer = require('socket.io-client')(serverURL);

//TODO: Add Actuators arrays and schemas
//TODO: ADD SOCKETIO COMMUNICATIONS
//TODO: Add SocketIO communication protocol with the server
socketToSever.on('connect',function(){
  fs.readFile(mainIDPath,'utf8',function(err,data){
    if(err){
      console.log(err);
      throw err;
    }
    socketToServer.emit('identification', {mainID: data}, function(err,res){
      if(err){
        console.log(err);
        throw err;
      }
      if(res.status){
        if(res.new){
          fs.writeFile(mainIDPath, res.id, 'utf8', function(err){
            if(err){
              console.log(err);
              throw err;
            }
            mainID=res.id;
            socketToServer.disconnect();
          });
        }
        else{
          connectedToServer=true;
        }
      }
      else{
        if(res.error){
          console.log(res.error);
        }
        socketToServer.disconnect();
      }
    });
  });
});
//TODO: Add SocketIO communication protocol with the envMonitor
//TODO: Add SocketIO communication protocol with the resMonitor
//TODO: Add SocketIO communication protocol with the actuators

ResMonitor.update({},{$set:{status:false}},{multi:true},function(err,res){
  if(err){
    throw err;
  }
  if(res.ok==1){
    EnvMonitor.update({},{$set:{status:false}},{multi:true},function(err,res){
      if(err){
        throw err;
      }
      console.log(res.ok +' '+res.nModified);
      if(res.ok==1){
        http1.listen(8080,function(){
          console.log('envMonitor socketserver running @ port: 8080');
        });
        http2.listen(8081,function(){
          console.log('resMonitor socketserver running @ port: 8081');
        });
      }
    });
  }
});

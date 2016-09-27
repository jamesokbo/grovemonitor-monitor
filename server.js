var express =require('express');
var app=express();

var http1= require('http').Server(app);
var http2= require('http').Server(app);
var envMonitorIO=require('socket.io')(http1);
var resMonitorIO=require('socket.io')(http2);

var mongoose= require('mongoose');
var configDB= require('./server/config/database.js');
mongoose.connect(configDB.url);

//MONGOOSE SCHEMAS
//Mongoose ResMonitor and its sensors' schemas
var ResMonitor=require('./server/models/resMonitor');
var Ph=require('./server/models/ph');
var Ec=require('./server/models/ec');
var DO=require('./server/models/do');
var WTemp=require('./server/models/wTemp');
var WLevel=require('./server/models/wLevel');

//Mongoose EnvMonitor and its sensors' schemas
var EnvMonitor=require('./server/models/envMonitor');
var ATemp=require('./server/models/aTemp');
var Rh=require('./server/models/rh');
var Lux=require('./server/models/lux');
var CO2=require('./server/models/co2');

//Socket arrays of connected monitors
var envMonitors=[];
var resMonitors=[];

//Mirror arrays with IDs of connected monitors
var envMonitorIDs=[];
var resMonitorIDs=[];

//TODO: Add Actuators arrays and schemas
//TODO: Add SocketIO communications




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
          console.log('envMonitor socketserver running @ port: 8081');
        });
        http2.listen(8081,function(){
          console.log('resMonitor socketserver running @ port: 8081');
        });
      }
    });
  }
});

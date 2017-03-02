var fs=require('fs');
var async=require('async');
var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../server/models/reading.js');


module.exports = function(socket){
  socket.on('disconnect',function(){
    envVariables.mainRPiConnectionStatus=false;
    var timeout=1000;
    async.whilst(function(){return !envVariables.mainRPiConnectionStatus},
    function(cb){
        console.log('attempting to reconnect');
        setTimeout(function(){
           socket.connect();
           cb();
       },timeout); 
    },function(){
        timeout=timeout+1000;
    });
  });
};

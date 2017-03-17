var fs=require('fs');
var async=require('async');
var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../models/reading.js');


module.exports = function(socket){
  socket.on('disconnect',function(){
    console.log('disconnected from mainRPi!');
    async.whilst(function(){return !envVariables.serverConnectionStatus},
        function(cb){
            setTimeout(function(){
                socket.connect();
                cb();
            },1000); 
        }
    );
    envVariables.mainRPiConnectionStatus=false;
  });
};

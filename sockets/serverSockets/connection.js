var fs=require('fs');
var async=require('async');
var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../server/models/reading.js');


module.exports = function(socket){
  socket.on('connect',function(){
      require('./emits/emitMainRPiIdentification.js')(socket);
  }); 
};

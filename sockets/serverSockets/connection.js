var fs=require('fs');
var async=require('async');
var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../server/models/reading.js');


module.exports = function(socket){
  socket.on('connect',function(){
    fs.readFile(constants.MAINRPIID_PATH,'utf8',function(err,data){
      if(err){
        throw err;
      }
      require('./emits/identification.js')(socket);
      constants.MAINRPI_ID=data;
    });
  }); 
  socket.on('disconnect',function(){
    envVariables.serverConnectionStatus=false;
  });
};

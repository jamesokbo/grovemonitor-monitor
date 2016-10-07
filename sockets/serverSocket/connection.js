var fs=require('fs');
var async=require('../../../async');
var constants= require('../../../constants.js');
var envVariables=require('../../../envVariables.js');
var Reading=require('../../../server/models/reading.js');


module.exports = function(socket){
  socket.on('connect',function(){
    fs.readFile(constants.MAINRPIID_PATH,'utf8',function(err,data){
      if(err){
        throw err;
      }
      require('./identification.js')(socket);
      constants.MAINRPI_ID=data;
    });
  }); 
  socket.on('disconnect',function(){
    envVariables.serverConnectionStatus=false;
  });
};

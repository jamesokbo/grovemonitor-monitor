var fs=require('fs');
var async=require('../../../../async');
var constants= require('../../../../constants.js');
var envVariables=require('../../../../envVariables.js');
var Reading=require('../../../../server/models/reading.js');

module.exports=function(socket){
  socket.emit('identification', {mainRPiID: constants.MAIN_ID}, function(err,res){
    if(err){
      throw err;
    }
    if(res.status){
      if(res.new){
        fs.writeFile(constants.MAIN_ID_PATH, res.mainRPiID, 'utf8', function(err){
          if(err){
            throw err;
          }
          constants.MAIN_ID=res.id;
          socket.disconnect();
        });
      }
      else{
        envVariables.serverConnectionStatus=true;
        Reading.find({},function(err,docs){
          if(err){
            throw err;
          }
          //MainRPi states what monitors are currently connected to it
          require('./connectedMonitors.js')(socket);
          require('./flushReadings.js')(socket);
        });
      }
    }
    else{
      if(res.error){
        console.log(res.error);
      }
      socket.disconnect();
    }
  });
}

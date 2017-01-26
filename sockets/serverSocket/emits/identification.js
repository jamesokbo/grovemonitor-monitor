var fs=require('fs');
var async=require('../../../../async');
var constants= require('../../../../constants.js');
var envVariables=require('../../../../envVariables.js');
var Reading=require('../../../../server/models/reading.js');
var serverMonitorIdentification=require('./serverMonitorIdentification.js');
var monitorID;

module.exports=function(socket){
  socket.emit('identification', {mainRPiID: constants.MAINRPI_ID}, function(err,res){
    if(err){
      throw err;
    }
    if(res.status){
      if(res.new){
        fs.writeFile(constants.MAINRPIID_PATH, res.mainRPiID, 'utf8', function(err){
          if(err){
            throw err;
          }
          constants.MAINRPI_ID=res.id;
          socket.disconnect();
        });
      }
      else{
        envVariables.serverConnectionStatus=true;
        //MainRPi states what monitors are currently connected to it for the server to identify them
        for(var i=0; i<envVariables.monitors.length();i++){
          serverMonitorIdentification({monitorID:envVariables.monitorIDs[i]},envVariables.monitors[i],socket,function(res,err){
            if(err){
              //TODO: Log error in file
            }
          });
        }
        Reading.find({},function(err,docs){
          if(err){
            throw err;
          }
          for(var i=0; i<docs.length();i++){
            
          }
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

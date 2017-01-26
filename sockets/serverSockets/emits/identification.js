var fs=require('fs');
var async=require('../../../../async');
var constants= require('../../../../constants.js');
var envVariables=require('../../../../envVariables.js');
var Reading=require('../../../../server/models/reading.js');
var emitMonitorIdentification=require('./emitMonitorIdentification.js');
var emitRReading=require('./emitRReading.js');

module.exports=function(socket){
  socket.emit('mainRPiIdentification', {mainRPiID: constants.MAINRPI_ID}, function(err,res){
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
          emitMonitorIdentification({monitorID:envVariables.monitorIDs[i]},envVariables.monitors[i],socket,function(res,err){
            if(err){
              //TODO: Log error in file
            }
          });
        }
        //MainRPi passes readings obtained while server connection was down and removes them afterwards
        Reading.find({},function(err,docs){
          if(err){
            throw err;
          }
          for(var i=0; i<docs.length();i++){
            emitRReading(socket,docs[i],function(res,err){
              if(err){
                //TODO: Log error in file
              }
              if(res.status){
                Reading.remove({_id:docs[i]._id},function(err,removed){
                  if(err){
                    throw err;
                  }
                });
              }
            });
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

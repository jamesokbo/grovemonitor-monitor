var fs=require('fs');
var async=require('async');
var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../server/models/reading.js');
var Monitor=require(__dirname+'/../../server/models/monitor.js');


module.exports = function(socket){
  socket.on('connect',function(){
    var data={
      monitorID:constants.MONITOR_ID
    };
    if(envVariables.mainRPiConnectionStatus){
      socket.emit('monitorIdentification',data,function(err, res) {
          if(err){
              throw err; //TODO: Log the error in a log file
          }
          if(res.status && !res.new){
              //This means that the monitor had already been identified by the server
                  Monitor.update({},{$set:{status:true}},function(err){
                      if(err){
                          throw err;
                      }
                      envVariables.mainRPiConnectionStatus=true;
                  });
          }
          if(res.status && res.new){
              //This means that the monitor had never been identified by the server
              Monitor.save(function(err,mon){
                  if(err){
                      throw err;
                  }
                  Monitor.update({_id:mon._id},{$set:{monitorID:res.monitorID,mainRPiID:res.mainRPiID}},function(err){
                      if(err){
                          throw err;
                      }
                      socket.disconnect();
                  });
              });
          }
          else{
              //This means that the monitor sent an ID but it's not identified by the server
              
          }
      });
    }
    else{
        //Lost connection to server
        //TODO: Log error to log file
    }
  }); 
};

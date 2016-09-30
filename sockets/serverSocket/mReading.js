var constants= require('../../../constants.js');
var errors= require('../../../errors.js');
var envVariables=require('../../../envVariables.js');
var EnvMonitor=require('../../../server/models/envMonitor.js');
var ResMonitor=require('../../../server/models/resMonitor.js');

module.exports = function(socket){
  socket.on('mReading',function(data,fn){
    if(data.resMonitorID){
      if(envVariables.resMonitorsIDs.indexOf(data.resMonitorID)!=-1){
        envVariables.resMonitors[resMonitorsIDs.indexOf(data.resMonitorID)].emit('mReading',data,function(err,ans){
          if(err){
            fn(err);
          }
          fn(ans);
        });
      }
      else{
        ResMonitor.find({resMonitorID:data.resMonitorID},function(err,docs){
          if(err){
            throw err;
          }
          if(docs.length!=0){
            fn(errors.m001);
          }
          else{
            fn(errors.m002);
          }
        });
      }
    }
    else{
      if(envVariables.envMonitorsIDs.indexOf(data.envMonitorID)!=-1){
        envVariables.envMonitors[envMonitorsIDs.indexOf(data.envMonitorID)].emit('mReading',data,function(err,ans){
          if(err){
            fn(err);
          }
          fn(ans);        
        });
      }
      else{
        EnvMonitor.find({envMonitorID:data.envMonitorID},function(err,docs){
          if(err){
            throw err;
          }
          if(docs.length!=0){
            fn(errors.m001);
          }
          else{
            fn(errors.m002);
          }
        });
      }
    }
  });
}

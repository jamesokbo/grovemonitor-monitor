var constants= require('../../../constants.js');
var errors= require('../../../errors.js');
var envVariables=require('../../../envVariables.js');

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
        fn(errors.m001);
      }
    }
    else{
      if(envVariables.envMonitorsIDs.indexOf(data.envMonitorID)!=-1){
        envVariables.envMonitors[resMonitorsIDs.indexOf(data.envMonitorID)].emit('mReading',data,function(err,ans){
          if(err){
            fn(err);
          }
          fn(ans);        
        });
      }
      else{
        fn(errors.m001);
      }
    }
  });
}

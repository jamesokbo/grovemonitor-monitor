var constants= require('../../../constants.js')
var envVariables=require('../../../envVariables.js')

module.exports = function(socket){
  socket.on('mReading',function(data,fn){
    if(data.resMonitorID){
      if(envVariables.resMonitorsIDs.indexOf(data.resMonitorID)!=-1){
        envVariables.resMonitors[resMonitorsIDs.indexOf(data.resMonitorID)].emit('mReading',data,function(err,ans){
          if(err){
            console.log(err);
            throw err;
          }
          fn(ans);
        });
      }
      else{
        //Error: The requested monitor has lost connection, please verify connectivity
      }
    }
    else{
      if(envVariables.envMonitorsIDs.indexOf(data.envMonitorID)!=-1){
        envVariables.envMonitors[resMonitorsIDs.indexOf(data.envMonitorID)].emit('mReading',data,function(err,ans){
          if(err){
            console.log(err);
            fn(err)
            throw err;
          }
          fn(ans);        
        });
      }
    }
});
}
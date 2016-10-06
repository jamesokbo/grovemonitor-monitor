var mongoose=require('../../../mongoose');
var errors=require('../../../errors.js');
var Monitor=require('../../../server/models/monitor.js');
var envVariables=require('../../../envVariables.js');

module.exports=function(monitorSocket,serverSocket){
  monitorSocket.on('disconnect', function(){
    if(monitorSocket.monitorID!=''){
      Monitor.update({monitorID:mongoose.Types.ObjectId(monitorSocket.monitorID)},
      {$set:{status:false, lastConnection:Date.now()}},function(err,res){
        if(err){
          throw err;
        }
        if(res.ok==1 && res.nModified==1){
          if(envVariables.monitorIDs.indexOf(monitorSocket.monitorID.toString())!=-1){
            envVariables.monitors.splice(envVariables.monitorIDs.indexOf(monitorSocket.monitorID.toString()),1);
            envVariables.monitorIDs.splice(envVariables.monitorIDs.indexOf(monitorSocket.monitorID.toString()),1);
            if(envVariables.serverConnectionStatus){
              serverSocket.emit('monitorDisconnect',{monitorID:monitorSocket.monitorID.toString()},function(err,res){
                if(err){
                  throw err;
                }
              });
            }
          }
        }
      });
    }
  });
};

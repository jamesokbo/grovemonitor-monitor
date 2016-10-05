var constants= require('../../../constants.js');
var errors= require('../../../errors.js');
var envVariables=require('../../../envVariables.js');
var EnvMonitor=require('../../../server/models/envMonitor.js');
var ResMonitor=require('../../../server/models/resMonitor.js');

module.exports = function(socket){
  socket.on('mReading',function(data,fn){
    if(envVariables.monitorIDs.indexOf(data.monitorID)!=-1){
      envVariables.monitors[monitorIDs.indexOf(data.monitorID)].emit('mReading',data,function(err,res){
        if(err){
          fn(err);
        }
        fn(res);
      });
    }
    else{
      Monitor.find({monitorID:data.monitorID},function(err,docs){
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
  });
}

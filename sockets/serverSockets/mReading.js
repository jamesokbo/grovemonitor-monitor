var constants= require('../../../constants.js');
var errors= require('../../../errors.js');
var envVariables=require('../../../envVariables.js');
var Monitor=require('../../../server/models/monitor.js');


module.exports = function(socket){
  socket.on('mReading',function(data,fn){
    if(envVariables.monitorIDs.indexOf(data.monitorID)!=-1){
      envVariables.monitors[envVariables.monitorIDs.indexOf(data.monitorID)].emit('mReading',data,function(err,res){
        if(err){
          throw err;
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
          fn(null,errors.m001);
        }
        else{
          fn(null,errors.m002);
        }
      });
    }
  });
};

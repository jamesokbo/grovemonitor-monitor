var constants= require('../../../constants.js');
var errors= require('../../../errors.js');
var envVariables=require('../../../envVariables.js');
var Monitor=require('../../../server/models/monitor.js');

module.exports = function(socket){
  socket.on('changeReservoirSize',function(data,fn){
    if(envVariables.monitorIDs.indexOf(data.monitorID)!=-1){
      envVariables.monitors[monitorIDs.indexOf(data.monitorID)].emit('changeReservoirSize',data,function(err,res){
        if(err){
          fn(err);
        }
        Monitor.update({monitorID:data.monitorID},{$set:{'resSize.height':data.height, 'resSize.area':data.area}},function(err,res){
          if(err){
            throw err;
            fn(res);
          }
        });
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
          fn(errors.m003);
        }
      });
    }
  });
};

var mongoose=require('mongoose');
var timeoutCallback = require('timeout-callback');
var Monitor=require('../models/monitor.js');
var envVariables=require('../../envVariables.js');
var constants=require('../../constants.js');
var errors=require('../../errors.js');

module.exports=function(socket){
  socket.on('editLBound',function(data,fn){
    Monitor.find({_id:data.monitorID},function(err,docs){
      if(err){
        throw err;
      }
      if(docs.length!=0){
        var monitorIndex=envVariables.monitorIDs.indexOf(data.monitorID);
        if(monitorIndex!=-1){
          envVariables.monitors[monitorIndex].emit('editLBound',data,timeoutCallback(constants.MONITOR_TIMEOUT,function(err,res){
            if(err){
              fn(err);
            }
            //success!
            fn(null,res);
          }));
        }
        else{
          //monitor not connected
          fn(errors.m001);
        }
      }
      else{
        //unidentified monitor
        fn(errors.m003);
      }
    });
  });
};

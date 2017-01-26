var mongoose=require('mongoose');
var Monitor=require('../models/monitor.js');
var envVariables=require('../../envVariables.js');
var errors=require('../../errors.js');

module.exports=function(socket){
  socket.on('editLBound',function(data,fn){
    if(Monitor.find({_id:data.monitorID},function(err,docs){
      if(err){
        throw err;
      }
      if(docs.length!=0){
        var monitorIndex=envVariables.monitorIDs.indexOf(data.monitorID);
        if(monitorIndex!=-1){
          envVariables.monitors[monitorIndex].emit('editLBound',data,function(res,err){
            if(err){
              fn(null,err);
            }
            //success!
            fn(res);
          });
        }
        else{
          //monitor not connected
          fn(null,errors.m001);
        }
      }
      else{
        //unidentified monitor
        fn(null,errors.m003);
      }
    })
  })
}

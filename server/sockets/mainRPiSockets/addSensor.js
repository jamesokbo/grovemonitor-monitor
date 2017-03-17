var mongoose=require('mongoose');
var Monitor=require('../../models/monitor.js');
var envVariables=require('../../envVariables.js');
var constants=require('../../constants.js');
var errors=require('../../errors.js');
var sensorArrays=require('../../sensorArrays.js');

module.exports=function(socket){
    var sensors;
    var res={};
    
    socket.on('addSensor',function(data,fn){
        console.log('adding sensor');
        Monitor.find({monitorID:data.monitorID},function(err,docs){
            if(err){
                throw err;
            }
            if(docs.length==1){
                sensors=docs[0].sensors;
                sensors.push(data.newSensor);
                sensors.sort();
                Monitor.update({monitorID:data.monitorID},
                {$set:{'sensors':sensors}},function(err,doc){
                  if(err){
                    throw err;
                  }
                  res.status=true;
                  
                  fn(null,res);
                });
            }
        });
    });
};
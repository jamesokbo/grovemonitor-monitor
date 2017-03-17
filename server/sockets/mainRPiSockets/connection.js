var constants= require(__dirname+'/../../constants.js');
var envVariables=require(__dirname+'/../../envVariables.js');
var Reading=require(__dirname+'/../../models/reading.js');
var Monitor=require(__dirname+'/../../models/monitor.js');
var emitRReading=require(__dirname+'/emits/emitRReading');

module.exports = function(socket){
  socket.on('connect',function(){
    socket.emit('monitorIdentification', {monitorID: constants.MONITOR_ID}, function(err,res){
      if(err){
        console.log(err);
      }
      else{
        if(res.status){
          if(res.new){
            var monitor= new Monitor();
            monitor.save(function(err,mon){
              if(err){
                throw err;
              }
              Monitor.update({_id:mon._id},{$set:{monitorID:res.monitorID}},function(err,response){
                if(err){
                  throw err;
                }
                constants.MONITOR_ID=res.monitorID;
                socket.disconnect();
              });
            });
          }
          else{
            envVariables.mainRPiConnectionStatus=true;
            
            //MainRPi passes readings obtained while server connection was down and removes them afterwards
            Reading.find({},function(err,docs){
              if(err){
                throw err;
              }
              for(var i=0; i<docs.length;i++){
                emitRReading(socket,docs[i],function(err,res){
                  if(err){
                    //TODO: Log error in file
                  }
                  if(res.status){
                    Reading.remove({_id:docs[i]._id},function(err,removed){
                      if(err){
                        throw err;
                      }
                    });
                  }
                });
              }
            });
          }
        }
      }
      
    });
  });
};


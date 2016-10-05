var mongoose=require('../../../mongoose');
var errors=require('../../../errors.js');
var Monitor=require('../../../server/models/monitor.js');
var envVariables=require('../../../envVariables.js');

module.exports=function(socket, serverSocket){
  socket.on('identification',function(data, fn){
    if(data.monitorID!='' && data.monitorID!=null){
      socket.monitorID=mongoose.Types.ObjectId(data.monitorID);
    
      Monitor.find({monitorID:socket.monitorID},function(err,docs){
        if(err){
          throw err;
        }
        if(docs.length!=0){
          Monitor.update({monitorID:socket.monitorID},{$set:{status:true, lastConnection:Date(Date.now())}},function(err,res){
            if(err){
              throw err;
            }
            console.log(res.ok+' '+res.nModified);
            if(res.ok==1 && res.nModified==1){
              envVariables.monitorIDs.push(socket.monitorID.toString());
              envVariables.monitors.push(socket);
              console.log('monitor '+ socket.monitoID+' has succesfully been identified');
              console.log('monitorIDs length: '+ envVariables.monitorIDs.length+', monitors length: '+envVariables.monitors.length);
              fn({status:true});
            }
          });
        }
        else{
          fn(errors.m003);
          socket.disconnect();
        }
      });
    }
      //If ID is empty its a new monitor. The server has to save it and assign a 'monitorID' value.
    else{ 
      if(envVariables.serverConnectionStatus){
        serverSocket.emit('newMonitor',data,function(err,res){
          if(err){
            throw err;
          }
          socket.monitor=new Monitor(res);
          socket.monitor.save(function(err,mon){
            if(err){
              throw err;
            }
            fn({status:true, new: true, monID:socket.monID});
          });
        });
      }
      else{
        fn(errors.m004);
        socket.disconnect();
      }
    }
  });
}

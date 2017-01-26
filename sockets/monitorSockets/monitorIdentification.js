var mongoose=require('../../../mongoose');
var errors=require('../../../errors.js');
var Monitor=require('../../../server/models/monitor.js');
var envVariables=require('../../../envVariables.js');
var emitMonitorIdentification=require('../serverSocket/emits/emitMonitorIdentification.js');

module.exports=function(socket, serverSocket){
  socket.on('monitorIdentification',function(data, fn){
    if(envVariables.serverConnectionStatus){
      //mainRPi connected to server
      emitMonitorIdentification(data, socket, serverSocket, function(res,err){
        if(err){
          //TODO: log this error in a file, monitor not identified by server
          socket.disconnect();
          throw err;
        }
        socket.monitorID=res._id;
        Monitor.update({monitorID:socket.monitorID},{$set:{status:true, lastConnection:Date.now()}},function(err,res){
          if(err){
            throw err;
          }
          console.log(res.ok+' '+res.nModified);
          if(res.ok==1 && res.nModified==1){
            if(envVariables.monitorIDs.indexOf(socket.monitorID)!=-1){
              //This occurs only when the monitor tries to establish connection and the mainRPi is connected to the server 
              envVariables.monitorIDs.push(socket.monitorID.toString());
              envVariables.monitors.push(socket);
            }
              fn({monitorID:socket.monitorID, mainRPiStatus:true, serverStatus:true});
          }
        });
      });
    }
    else{
      //mainRPi connection to server is down
      Monitor.find({monitorID:data.monitorID},function(err,docs){
        if(err){
          throw err;
        }
        if(docs.length()>0){
          //Monitor identified by mainRPi but connection to server is down
          socket.monitorID=data.monitorID;
          Monitor.update({monitorID:socket.monitorID},{$set:{status:true, lastConnection:Date.now()}},function(err,res){
            if(err){
              throw err;
            }
            console.log(res.ok+' '+res.nModified);
            if(res.ok==1 && res.nModified==1){
              envVariables.monitorIDs.push(socket.monitorID.toString());
              envVariables.monitors.push(socket);
              fn({monitorID:socket.monitorID, mainRPiStatus:true, serverStatus:false});
            }
          });
        }
        else{
          //Monitor not identified by mainRPi and connection to server down
          fn(null,errors.m006);
          socket.disconnect();
        }
      });
    }
  });
};

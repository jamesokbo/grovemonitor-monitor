var RReading=require('../../../server/models/rReading.js');
var envVariables=require('../../../envVariables.js');
var errors=require('../../../errors.js');

module.exports=function(socket, serverSocket){
  socket.on('rReading',function(data,fn){
    if(envVariables.monitorIDs.indexOf(data.monID)!=-1){
      if(envVariables.serverConnectionStatus){
        serverSocket.emit('rReading',data,function(err,res){
          if(err){
            throw err;
          }
          fn(res);
        });
      }
      else{
        rReading= new RReading(data);
        rReading.save(function(err,res){
          if(err){
            throw err;
          }
          fn(res);
        });
      }
    }
    else{
      fn(errors.m003);
    }
  });
}

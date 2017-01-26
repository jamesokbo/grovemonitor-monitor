var mongoose=require('../../../../mongoose');
var errors=require('../../../../errors.js');
var Monitor=require('../../../../server/models/monitor.js');
var envVariables=require('../../../../envVariables.js');


module.exports=function(serverSocket){

  var data={monitorIDs:envVariables.monitorIDS};
  
  serverSocket.emit('connectedMonitors',data,function(err, res){
    if(err){
      throw err;
    }
    //TODO: success logic
  });
};

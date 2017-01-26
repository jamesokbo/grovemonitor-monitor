var fs=require('fs');
var async=require('../../../../async');
var constants= require('../../../../constants.js');
var envVariables=require('../../../../envVariables.js');
var errors=require('../../../../errors.js');

module.exports=function(serverSocket,reading,fn){
   if(envVariables.serverConnectionStatus){
      serverSocket.emit('rReading',reading,function(res,err){
         if(err){
            throw err;
         }
         fn(res);
      });
   }
   else{
      //lost connection of server
      fn(null,errors.m004);
   }
};

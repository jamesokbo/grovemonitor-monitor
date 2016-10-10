var fs=require('fs');
var async=require('../../../../async');
var constants= require('../../../../constants.js');
var envVariables=require('../../../../envVariables.js');
var Reading=require('../../../../server/models/reading.js');

module.exports=function(socket){
   var i=0;
   var j=0;
        
   async.whilst(function(){i<docs.length},function(){
       async.whilst(function(){i==j},function(){
           socket.emit('rReading',docs[i],function(err,res){
             if(err){
               throw err;
             }
             if(res.status){
               Reading.findById(docs[i]._id,function(err,doc){
                 if(err){
                   throw err;
                 }
                 doc.remove(function(err,res){
                   if(err){
                     throw err;
                   }
                 });
               });
               i++;
             }
            });
       j++;
      },function(){});
   },function(){});
}

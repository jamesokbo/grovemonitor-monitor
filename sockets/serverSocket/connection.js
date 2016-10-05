var fs=require('fs');
var async=require('../../../async');
var constants= require('../../../constants.js')
var envVariables=require('../../../envVariables.js')
var Reading=require('../../../server/models/reading.js')


module.exports = function(socket){
  socket.on('connect',function(){
    fs.readFile(constants.MAIN_ID_PATH,'utf8',function(err,data){
      if(err){
        throw err;
      }
      constants.MAIN_ID=data;
      socket.emit('identification', {mainID: constants.MAIN_ID}, function(err,res){
        if(err){
          throw err;
        }
        if(res.status){
          if(res.new){
            fs.writeFile(constants.MAIN_ID_PATH, res.mainID, 'utf8', function(err){
              if(err){
                throw err;
              }
              constants.MAIN_ID=res.id;
              socket.disconnect();
            });
          }
          else{
            envVariables.serverConnectionStatus=true;
            Reading.find({},function(err,docs){
              if(err){
                throw err;
              }
              var i=0;
              var j=0;
              async.whilst(i<docs.length,
                async.whilst(i==j,
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
                );
              ); 
            });
          }
        }
        else{
          if(res.error){
            console.log(res.error);
          }
          socket.disconnect();
        }
      });
    });
  }); 
  socket.on('disconnect',function(){
    envVariables.serverConnectionStatus=false;
  });
}

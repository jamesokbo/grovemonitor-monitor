var fs=require('fs');
var constants= require('./constants.js')

module.exports = function(serverURL){
  var io=require('socket.io-client')(URL);
  io.on('connect',function(){
    fs.readFile(constants.MAIN_ID_PATH,'utf8',function(err,data){
      if(err){
        console.log(err);
        throw err;
      }
      constants.mainID=data;
      io.emit('identification', {mainID: constants.mainID}, function(err,res){
        if(err){
          console.log(err);
          throw err;
        }
        if(res.status){
          if(res.new){
            fs.writeFile(constants.MAIN_ID_PATH, res.id, 'utf8', function(err){
              if(err){
                console.log(err);
                throw err;
              }
              constants.mainID=res.id;
              io.disconnect();
            });
          }
          else{
            constants.serverConnectionStatus=true;
          }
        }
        else{
          if(res.error){
            console.log(res.error);
          }
          socketToServer.disconnect();
        }
      });
    });
  });
  
}

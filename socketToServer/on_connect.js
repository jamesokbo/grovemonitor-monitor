var fs=require('fs');
var constants= require('../../constants.js')
var envVariables=require('../../envVariables.js')

module.exports = function(socket){
  socket.on('connect',function(){
    fs.readFile(constants.MAIN_ID_PATH,'utf8',function(err,data){
      if(err){
        console.log(err);
        throw err;
      }
      constants.MAIN_ID=data;
      socket.emit('identification', {mainID: constants.MAIN_ID}, function(err,res){
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
              constants.MAIN_ID=res.id;
              socket.disconnect();
            });
          }
          else{
            envVariables.serverConnectionStatus=true;
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
}

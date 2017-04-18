var envVariables=require(__dirname+'/../../envVariables.js');

module.exports = function(socket){
  socket.on('disconnect',function(){
    console.log('disconnected from mainRPi!');
    envVariables.mainRPiConnectionStatus=false;
  });
};

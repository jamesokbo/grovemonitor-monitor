var Monitor=require('../../../server/models/monitor.js');
var errors=require('../../../errors.js');
var envVariables=require(__dirname+'/../../../envVariables.js');

module.exports=function(data,monitorSocket,serverSocket,fn){
    if(envVariables.serverConnectionStatus){
        serverSocket.emit('monitorIdentification',data,function(err, res) {
            if(err){
                fn(null,err);
                throw err;
            }
            if(res.status && !res.new){
                //This means that the monitor had already been identified by the server
                Monitor.save(function(err,mon){
                    if(err){
                        throw err;
                    }
                    Monitor.update({_id:mon._id},{$set:{monitorID:res.monitorID}},function(err){
                        if(err){
                            throw err;
                        }
                        fn(mon);
                    });
                });
            }
            if(res.status && res.new){
                //This means that the monitor had never been identified by the server
                Monitor.save(function(err,mon){
                    if(err){
                        throw err;
                    }
                    Monitor.update({_id:mon._id},{$set:{monitorID:res.monitorID}},function(err){
                        if(err){
                            throw err;
                        }
                        //success
                        fn(mon);
                    });
                });
            }
            else{
                //This means that the monitor sent an ID but it's not identified by the server
                fn(null,errors.m003);
                monitorSocket.disconnect();
            }
        });
    }
    else{
        //Lost connection to server
        fn(null,errors.m004);
    }
};

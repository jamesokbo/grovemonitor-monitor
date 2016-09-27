var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var mainRPiSchema= mongoose.Schema({
    mainRPiID:String, /*Assigned by the server on identification*/
    userID:String, /* The ID of the user to whom this system belongs to */
    name:String, /* Assigned by the user to identify his Grove */
    status: Boolean, /* true if connected to the server */
    lastConnection: Date,
    tempUnit:String /* Defined by the user, value is either 'Celsius' or 'Fahrenheit' */
});

module.exports=mongoose.model('MainRPi',mainRPiSchema);


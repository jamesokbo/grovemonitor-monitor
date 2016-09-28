var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var envMonitorSchema= mongoose.Schema({
    envMonID:String, /*ID assigned by the mainRPi on first 'identification', kept as a .txt file in the resMonitor*/
    mainID:String, /*main RPi's ID from the server to whom this resMonitor belongs to*/
    name:String, /*name of the monitor, assigned by the user*/
    status: Boolean, /*true if connected to the main RPi*/
    lastConnection: Date, /*Last connection to the main RPi*/
    tempUnit:String, /*Assigned by the user, value can be either 'Celsius' or 'Fahrenheit'*/
    aTempStatus: Boolean, /*True if the sensor is plugged in and working*/
    rhStatus: Boolean,  /*True if the sensor is plugged in and working*/
    co2Status: Boolean, /*True if the sensor is plugged in and working*/
    luxStatus: Boolean, /*True if the sensor is plugged in and working*/
    aTempLast: {reading: Number, date: Date, compensated:Boolean}, /*last ambient temperature*/
    rhLast: {reading: Number, date: Date, compensated:Boolean}, /*last relative humidity reading*/
    co2Last: {reading: Number, date: Date}, /*last CO2 reading*/
    luxLast: {reading: Number, date: Date}, /*last Lux*/
});

module.exports=mongoose.model('EnvMonitor',envMonitorSchema);

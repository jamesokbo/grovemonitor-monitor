var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var resMonitorSchema= mongoose.Schema({
    name:String, /*name of the monitor, assigned by the user*/
    mainID:String, /*main RPi's ID from the server*/
    status: Boolean, /*true if connected to the main RPi*/
    lastConnection: Date, /*Last connection to the main RPi*/
    tempUnit:String, /*Assigned by the user, value can be either 'Celsius' or 'Fahrenheit'*/
    phCal4: Date, /*Last calibration at pH 4*/
    phCal7: Date, /*Last calibration at pH 7*/
    phCal10: Date, /*Last calibration at pH 10*/
    phStatus: Boolean, /*True if the sensor is plugged in and working*/
    ecStatus: Boolean,  /*True if the sensor is plugged in and working*/
    wTempStatus: Boolean, /*True if the sensor is plugged in and working*/
    usReaderStatus: Boolean, /*True if the sensor is plugged in and working*/
    phLast: {reading: Number, date: Date, compensated:Boolean}, /*última lectura del pH (ya sea manual o de rutina) y fecha de la última lectura*/
    ecLast: {reading: Number, date: Date, compensated:Boolean}, /*última lectura del ec (ya sea manual o de rutina) y fecha de la última lectura*/
    wTempLast: {reading: Number, date: Date}, /*last wTemp*/
    usReaderLast: {reading: Number, date: Date}, /*last distance reading*/
    resSize: {height: Number, area: Number}, /*height and area of reservoir, in order to estimate the level*/
    resLevelLast: Number, /* % of capacity */
});

module.exports=mongoose.model('ResMonitor',resMonitorSchema);

var mongoose = require('mongoose');
var Schema=mongoose.Schema;
var monitorSchema= mongoose.Schema({
    monitorID:String, /*ID assigned by the mainRPi on first 'identification', kept as a .txt file in the envMonitor*/
    mainID:String, /*main RPi's ID to whom this resMonitor belongs to*/
    type:String, /*either envMonitor or resMonitor*/
    name:String, /*name of the monitor, assigned by the user*/
    status: String, /*disconnected, warning or ok*/
    lastConnection: Date, /*Last connection to the main RPi*/
    resSize: {height: {type:Number,default:0}, area:{type:Number,default:0}}, /*height and area of reservoir, set by the user*/
    tempUnit:{type: String, default:'Celsius'},
    aTemp:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    rh:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    co2: {status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    lux:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    ph:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number, cal4:Date, cal7:Date, cal10:Date},
    ec:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    do:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    wTemp:{status: Boolean, lastReading:Number, lastDate:Number, lBound:Number, uBound:Number},
    usReader: {status: Boolean, lastReading:Number, lastDate:Number}, /*last distance reading*/
    resLevel: {lastReading:Number, lastDate:Number, lBound:Number, uBound:Number}, /* % of capacity */
});

module.exports=mongoose.model('Monitor',monitorSchema);

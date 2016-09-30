var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var readingSchema= mongoose.Schema({
	monID:String,
	readingType:String, //Value: 'pH','EC', 'wTemp', 'wLevel', 'DO', 'aTemp', 'RH', 'lux', 'CO2'
	compensated:{type:Boolean,default:false}, 
	reading:{type:Number,default:0}, 
	date:{type:Number,default:Date.now()}
});

module.exports=mongoose.model('Reading',readingSchema);

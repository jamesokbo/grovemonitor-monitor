var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var phSchema= mongoose.Schema({
	resMonID:String,
	mainID:String,
	status:Boolean,
	compensated:Boolean, 
	reading:Number, 
	date:Number,
	error:String
});

module.exports=mongoose.model('Ph',phSchema);

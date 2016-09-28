var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var phSchema= mongoose.Schema({
  status:Boolean,
	resMonID:String,
  mainID:String,
	compensated:Boolean, 
	reading:Number, 
	date:Number,
	error:String
});

module.exports=mongoose.model('Ph',phSchema);

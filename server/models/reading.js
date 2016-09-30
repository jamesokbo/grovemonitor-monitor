var mongoose = require('mongoose');
var Schema=mongoose.Schema;

var readingSchema= mongoose.Schema({
	monID:String,
	readingType:String,
	compensated:{type:Boolean,default:false}, 
	reading:{type:Number,default:0}, 
	date:{type:Number,default:Date.now()}
});

module.exports=mongoose.model('Reading',readingSchema);

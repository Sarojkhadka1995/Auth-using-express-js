var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email:{
		type:String,
		// unique:true,
		// lowercase:true,
		// required:[true,'{PATH} is required.'],
		// trim:true
	},
	username:{
		type:String,
		index:true
		// unique:true,
		// required:[true,'{PATH} is required.'],
		// trim:true
	},
	password:{
		type:String,
		// required:[true,'{PATH} is required.']
	}
});
var Users = module.exports = mongoose.model('myuser',userSchema);
// module.exports.createUser = function(newUser,callback){
// 	newUser.save(callback);
// };
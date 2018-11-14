var Users = require('../model/usersdetail')
exports.getdata=(req,res,next)=>{
var email=usersession.email;

Users.find({email:email}, function(err,user){
	if(err){
		console.log(err);
		return res.status(500).send();
	}
	console.log(user.username,user.password);	
})
};
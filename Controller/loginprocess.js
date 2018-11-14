var User = require('../model/usersdetail')
exports.getform=(req, res, next) => {
   res.render("login_form.ejs",{title:"Login form",success:req.session.success,log_errors:req.session.log_errors})
   console.log(req.session.email)
   req.session.success=null;
   req.session.log_errors=null;
};

exports.validate=(req,res,next) => {
	console.log(req.body);
	req.check('email',"Invalid email").isEmail();
	req.check('password',"Please enter a valid password").isLength({min:5});

	var log_errors=req.validationErrors();
	if(log_errors){
		req.session.log_errors=log_errors;
		req.session.success=false;
		console.log(log_errors);
		res.render('login_form.ejs',{log_errors:req.session.log_errors});
	}else{
		var email=req.body.email;
		var password=req.body.password;

		User.findOne({email:email, password:password}, function(err,user){
			if(err){
				console.log(err);
				return res.status(500).send();
			}

			if(!user){
				res.render('login_form',{msg:"User not found"})
				return res.status(404).send();
			}

			req.session.success=true;
			req.session.user={
				email:req.body.email
			}
			res.render('dashboard',{usersession:req.session.user})
			
		})
	}


	// if(req.body.email=="saroj@gmail.com"){
	// 	if(req.body.password=="12345"){
	// 		req.session.user={
	// 			"email":req.body.email,
	// 			"password":req.body.password}
	// 		res.render("dashboard.ejs",{usersession:req.session.user});

	// 	}else{
	// 		res.render("login_form.ejs",{
	// 			error:"Password invalid"
	// 		})
	// 	}
	// }else{
	// 	res.render("login_form.ejs",{
	// 		error:"Username invalid"
	// 	});
	// }
}

exports.logout=(req,res,next) =>{
	req.session.destroy();
	res.redirect('/login')
}
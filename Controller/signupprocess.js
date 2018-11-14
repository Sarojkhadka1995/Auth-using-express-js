 var Users = require('../model/usersdetail');
//var newUsers=new users();

exports.getform=(req,res,next) =>{
	res.render("signup_form.ejs",{title: 'Form validatoin', success:req.session.success,errors:req.session.errors});
	req.session.errors = null;
	req.session.success=null;
};

exports.validate=(req,res,next)=>{ 
 
	req.check('email','Invalid email address').isEmail();
	req.check('name','Invalid username').isLength({min:3});
	// {ignore_whitespace:false});
	req.check('password','Password must be 5 digit long').isLength({min: 4});
	req.check('password','Password doesnot match').equals(req.body.cfpassword);


	var errors = req.validationErrors();
	if(errors){
		req.session.errors = errors;
		req.session.success=false;
		console.log(errors);
		
		res.redirect('/login');
	}else{
		
		//Getting user input
			var username = req.body.uname;
		var email = req.body.email;
		var password = req.body.password;	

		var newUser = new Users();
		newUser.username = username;
		newUser.email = email;
		newUser.password = password;

		 //create user
		newUser.save(function(err){
		// Users.createUser(newUser, function(err,user){
		if(err){
				console.log(err);
				return res.status(500).send();
		}
		//return res.status(200).send();
		//console.log(newUsers);
		req.session.success=true;
		req.session.user={
			"email":req.body.email
		}
			res.render('dashboard.ejs',{usersession:req.session.user});
		});

	}
	
	
	 // 	//create user
		// // Users.createUser(newUser, function(err,user){
		// Users.save(function(err,user){
		// 	if(err){
		// 		console.log(err);
		// 		return res.status(500).send();
		// 	}
		// 	return res.status(200).send();
		// 	console.log(users);
		// });
		
	// 	req.flash('success','Thank you for signing up with us.');
		
	// 	//Storing user detail in session
	// 	req.session.user={
	// 		email:req.session.email
	// 	}
	// 	res.render('dashboard.ejs',{user:req.session.user})
	// }


	// if(req.body.email && req.body.uname && req.body.password && req.body.cfpassword){
	// 	if(req.body.password != req.body.cfpassword){
	// 		res.render("signup_form.ejs",{
	// 			error:"Password mismatch"
	// 		})
	// 		console.log("Password mismatch");
	// 	}
	// 	var Userdata={
	// 		email: req.body.email,
	// 		uname:req.body.uname,
	// 		password:req.body.password
	// 	}
	// 	console.log(Userdata.email,Userdata.uname,Userdata.password);
	// 	newUsers.save(Userdata,function(err,users){
	// 		if(err){
	// 			return next(err)
	// 		}else{
	// 			req.session.user={
	// 				email:req.session.email
	// 			}
	// 			res.render("dashboard.ejs",{user:req.session.user})
	// 		}
	// 	})
	// }else{
	// 	res.render("singup_form.ejs",{
	// 		error:"Incomplete data"
	// 	});
	// 	console.log('Incomplete data');
	// }
};

exports.delete_users=(req,res,next)=>{
	res.send("Not implemented yet");
};

exports.update_user=(req,res,next)=>{
	res.send("Not implemented yet")
};
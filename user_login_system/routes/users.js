var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
	res.render('register',{title:'Register'});
});

router.get('/login',function  (req,res,next) {
	// body...
	res.render('login',{title:'LogIn'});
});

router.post('/register',function(req,res,next){
	var name = req.body.name,
	    email = req.body.email,
	    username = req.body.username,
            password = req.body.password,
            cpassword = req.body.cpassword;
	if(req.files.profileImage){
		var profileImageOriginalName = req.files.profileImage.originalName;
		var profileImageName = req.files.profileImage.name;
		var profileImageMime = req.files.profileImage.mimetype;
		var profileImagePath = req.files.profileImage.path;
		var profileImageExt = req.files.profileImage.extension;
		var profileImageSize = req.files.profileImage.size;
	}else{
		var profileImageName = 'noimage.jpg';
	}	
	
	//Form validation
	req.checkBody('name','Name Field is required').notEmpty();
	req.checkBody('email','Email Field is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('username','User Name Field is required').notEmpty();
	req.checkBody('password','Password Field is required').notEmpty();
	req.checkBody('cpassword','Password do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register',{
			errors:errors,
			name:name,
			email:email,
			username:username,
			password:password,
			cpassword:cpassword
		});
	}else{
		var newUser = new User({
			name:name,
			email:email,
			username:username,
			password:password,
			profileImage:profileImageName
		});

		//create user
		User.createUser(newUser,function(err,user){
			if (err) throw err;
			console.log(user);
			req.flash('You are successfully register,you can login');
			res.location('/');
			res.redirect('/');
		});
	
	}
});

module.exports = router;

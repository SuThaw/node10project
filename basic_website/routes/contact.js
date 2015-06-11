var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/',function (req,res,next) {
	// body...
	res.render('contact',{title:'Contact Us'});
});

router.post('/send',function  (req,res,next) {
	// body...
	
	var transport = nodemailer.createTransport({
		service:'Gmail',
		auth:{
			user:'youremail',
			pass:'yourpassword'
		}

	});

	var mailOptions = {
		from: req.body.name + '<' + req.body.email + '>',
		to:'suthaw524@gmail.com',
		subject: 'website Submission',
		text:'You have a new submission',
		html:'<p style="color:red;">You got a new submission</p>'
	};

	transport.sendMail(mailOptions,function  (err,info) {
		// body...
		if(err){
			console.log(err);
			res.redirect('/');
		}else{
			console.log(info.response);
			res.redirect('/');
		}
	});
});


module.exports = router; 

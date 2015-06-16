var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add',function(req,res,next){
	res.render('addcategory',{
		'title':"Add Category"
	});

});


router.post('/add',function(req,res,next) {
	var title = req.body.title;
	
	req.checkBody('title','Title fiedl is required').notEmpty();
	
	var errors = req.validationErrors();

	if(errors){
		res.render('addcategory',{
			"errors":errors,
			"title":title
		});
	}else{
		var categories = db.get('categories');
		categories.insert({
			"title":title
		},function(err,category){
			if(err) return res.send('There was an issue submitting category');
			req.flash('success','Category Submiited');
			res.location('/');
			res.redirect('/');

		});
	}

});




module.exports = router;

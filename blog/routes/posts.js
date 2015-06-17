var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');


router.get('/add',function(req,res,next){
	var categories = db.get('categories');
	categories.find({},{},function(err,categories){
		if(err) throw(err);
		res.render('addpost',{
			title:"Add Post",
			categories:categories
		});
	
	});
});

router.post('/add',function(req,res,next){
	var title = req.body.title;
	var body = req.body.body;
	var category = req.body.category;
	var author = req.body.author;
	var date = new Date();

	if(req.files.mainimage){
		var mainImageOrignalName = req.files.mainimage.originalname;
		var mainImageName = req.files.mainimage.name;
		var mainImageMime = req.files.mainimage.mimetype;
		var mainImagePath = req.files.mainimage.imagepath;
		var mainImageExt = req.files.mainimage.imageextension;
		var mainImageSize = req.files.mainimage.size;

	}else{
		var mainImageName = 'noimage.png';
	}

	//validation
	req.checkBody('title','Title Field is required').notEmpty();
	req.checkBody('body','Body Field is required').notEmpty();
	var errors = req.validationErrors();
	if(errors){
		var categories = db.get('categories');
		categories.find({},{},function(err,categories){
			res.render('addpost',{
			"errors":errors,
			"title":title,
			"body":body,
			"categories":categories
		});
	
		});
	}else{
		var posts = db.get('posts');

		//submit to db

		posts.insert({
			"title":title,
			"body":body,
			"category":category,
			"date":date,
			"author":author,
			"mainimage":mainImageName
		},function(err,post){
			if(err){
				res.send('There was an issue in submitting post');
			}else{
				req.flash("success",'post submitted');
				res.location('/');
				res.redirect('/');
			}
			
		});
	}
});

module.exports = router;

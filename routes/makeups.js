var express = require("express");
var router  = express.Router();
var Makeup  = require("../models/makeup");
var middleware = require("../middleware");
var request = require("request");


//index route--show all makeup reviews
router.get("/",function(req,res){
	//Get all makeup reviews from DB
	Makeup.find({},function(err,allMakeups){
		if(err){
			console.log(err);
		}else{
			res.render("makeups/index",{makeups:allMakeups,currentUser:req.user});
		}
	});
	
});
//create route--add new makeup review to DB
router.post("/",middleware.isLoggedIn,function(req,res){
	//get data from form and add to makeups array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	var newMakeup = {name:name,image:image,description:desc,author:author};
	
	//Create a new review and save to database
	Makeup.create(newMakeup,function(err,newlycreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/makeups");
		}
	});
	//redirect back to makeups page
	
});
//NEW--show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("makeups/new");
});
//show--description
router.get("/:id",function(req,res){
	//find review with provided id
	Makeup.findById(req.params.id).populate("comments").exec(function(err,foundMakeup){
		if(err){
			console.log(err);
		}else{
			//render show template with that makeup
			res.render("makeups/show",{makeup:foundMakeup});
		}
	});
});


//edit makeup route
router.get("/:id/edit",middleware.checkUserMakeup,function(req,res){
	Makeup.findById(req.params.id,function(err,foundMakeup){
		if(err){
			console.log(err);
			res.redirect("/makeups");
		}else{
			res.render("makeups/edit",{makeup:foundMakeup});
		}
	});
	
});
//update makeup route
router.put("/:id",middleware.checkUserMakeup, function(req, res){
    Makeup.findByIdAndUpdate(req.params.id, req.body.makeup, function(err, updatedMakeup){
        if(err){
            //req.flash("error", err.message);
            res.redirect("/makeups");
        } else {
            //req.flash("success","Successfully Updated!");
            res.redirect("/makeups/" +req.params.id);
        }
    });
});

//destroy makeup route
router.delete("/:id",middleware.checkUserMakeup,function(req, res){
   Makeup.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/makeups");
      } else {
          res.redirect("/makeups");
      }
   });
});



module.exports = router;
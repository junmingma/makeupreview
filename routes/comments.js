var express = require("express");
var router  = express.Router({mergeParams:true});
var Makeup  = require("../models/makeup");
var Comment  = require("../models/comment");
var middleware = require("../middleware");

//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
	Makeup.findById(req.params.id,function(err,makeup){
		if(err){
			console.log(err);
		}else{
			//render show template with that makeup
			res.render("comments/new",{makeup:makeup});
	}
	
	  });
});

//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
	//lookup makeups using id
	Makeup.findById(req.params.id,function(err,makeup){
		if(err){
			console.log(err);
			res.redirect("/makeups");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
				//add username and id to comment
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				//save comment
				comment.save();
				makeup.comments.push(comment);
				makeup.save();
				res.redirect("/makeups/"+makeup._id);}
			});
		}
	});
	
});

router.get("/:comment_id/edit", middleware.isLoggedIn, function(req, res){
    // find campground by id
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {makeup_id: req.params.id, comment: comment});
        }
    });
});

router.put("/:comment_id",middleware.checkUserComment, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/makeups/" + req.params.id);
       }
   }); 
});

router.delete("/:comment_id",middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
			req.flash("success","comment deleted");
            res.redirect("/makeups/" + req.params.id);
        }
    });
});



module.exports = router;
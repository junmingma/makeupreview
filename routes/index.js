var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");


//root toute
router.get("/",function(req,res){
	res.render("landing");
});

//AUTH routes
//show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("err",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to makeup world");
           res.redirect("/makeups"); 
        });
    });
});


//show login form
router.get("/login",function(req,res){
	res.render("login");
});
//login logic
router.post("/login",passport.authenticate("local",
		{successRedirect:"/makeups",
		failureRedirect:"/login"}),function(req,res){
	
});

//log out
router.get("/logout", function(req, res){
    req.logout();
	req.flash("success","Logged you out");
    res.redirect("/makeups");
});





module.exports = router;
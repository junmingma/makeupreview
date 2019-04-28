var Comment = require("../models/comment");
var Makeup = require("../models/makeup");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You must be signed in to do that!");
        res.redirect("/login");
    },

 checkUserMakeup :function(req, res, next) {
 if(req.isAuthenticated()){
        Makeup.findById(req.params.id, function(err, makeup){
           if(err){
               req.flash("error", "Makeup not found");
               res.redirect("back");
           }  else {
 
            // check if makeup exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
            if (!makeup) {
                    req.flash("error", "Item not found.");
                    return res.redirect("/");
                }
            // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
 
            if(makeup.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("/makeups/" + req.params.id);
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/makeups/" + req.params.id);
    }
 },
    checkUserComment: function(req, res, next){
        console.log("YOU MADE IT!");
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that!");
                   res.redirect("/makeups/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("login");
        }
    }
};
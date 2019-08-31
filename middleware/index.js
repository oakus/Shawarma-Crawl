var Restaurant = require("../models/restaurants");
var Comment = require("../models/comment");
// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkRestaurantOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                res.redirect("/restaurants");
            }   else {
                // does user own the restaurant
            if(foundRestaurant.author.id.equals(req.user._id)){
                next();
                } else {
                res.redirect("back");
                }                    
            }
    });
    }  else {
        res.redirect("back");    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Restaurant not found");
                res.redirect("back");
            }   else {  
                // does user own the comment
            if(foundComment.author.id.equals(req.user._id)){
                next();
             } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
             }                    
            }
    });
    }  else {
        res.flash("error", "You need to be logged in to do that")
        res.redirect("back");    
    }
}

//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged into do that");
    res.redirect("/login");
}

module.exports = middlewareObj
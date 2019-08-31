var express = require('express');
var router  = express.Router();
var Restaurant = require("../models/restaurants");
var middleware = require("../middleware");

//INDEX - show all restaurants
router.get("/", function(req, res){
    // Get all restaurants from DB
    Restaurant.find({}, function(err, allRestaurants){
        if(err){
            console.log(err);
        }   else {
            res.render("restaurants/index",{restaurants:allRestaurants});
        }
    });    
});

//CREATE - add new restaurants to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to restaurants array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username  
    }
    var newRestaurant = {name: name, price: price, image: image, description: desc, author: author}
    // Create a new restaurant and save to DB
    Restaurant.create(newRestaurant, function(err, newlyCreated){
        if(err) {
            console.log(err)
        } else {
            // redirect back to restaurant page
            res.redirect("/restaurants");   
        }
    });
});

//NEW - show form to create new restaurant
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("restaurants/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the restaurant with provided ID
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        if(err){
            console.log(err);
        } else {
            console.log(foundRestaurant)
            //render show tempalte with that restaurant
            res.render("restaurants/show", {restaurant: foundRestaurant});
        }
    });
}); 

// EDIT RESTAURANT ROUTE
router.get("/:id/edit", middleware.checkRestaurantOwnership, function(req, res){
    
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        res.render("restaurants/edit", {restaurant: foundRestaurant})
    });
          
});

// UPDATE RESTAURANT ROUTE
router.put("/:id", middleware.checkRestaurantOwnership, function(req, res){
    // find and update the correct campground
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant){
        if(err) {
            res.redirect("/restaurants");
        }   else {
            res.redirect("/restaurants/" + req.params.id)
        }
    })
    // redirect to show page
});

// DESTROY RESTAURANT ROUTE
router.delete("/:id", middleware.checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req,params.id, function(err){
        if(err){
            res.redirect("/restaurants");
        }
    });
});

module.exports = router;
var mongoose = require("mongoose");
var Restaurant = require("./models/restaurants");
var Comment = require("./models/comment")

var data = [ 
    {
        name: "Tasty Shawarma", 
        image: "https://b.zmtcdn.com/data/pictures/4/8901564/4d5e148c7b915ca1f8aac51859d7f4e9.jpg?crop=2448%3A2448%3B558%2C0&fit=around%7C200%3A200",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Family Shawarma and Falafel", 
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/uVC1enmJo1mt6z0q9ZLEmA/ls.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Delicious Shawarma and Falafel", 
        image: "https://s3-media1.fl.yelpcdn.com/bphoto/5dgLJN354nT3ZXyOwiwG4A/348s.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all restaurants
   Restaurant.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed restaurants!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few restaurants
            data.forEach(function(seed){
                Restaurant.create(seed, function(err, restaurant){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a restaurant");
                        //create a comment
                        Comment.create(
                            {
                                text: "I eat the meat",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    restaurant.comments.push(comment);
                                    restaurant.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;
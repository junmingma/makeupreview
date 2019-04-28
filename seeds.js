var mongoose = require("mongoose");
var Makeup = require("./models/makeup");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Demi Matte cream lipstick", 
        image: "https://d10qoa1dy3vloz.cloudfront.net/resized/680x854/slots-img/hud/hud059_hudabeauty_demimattecreamlipstick_gamechanger_1560x1960-vgt9m.jpg",
        description: " a demi-matte cream lipstick with the same superlative staying power and an irresistible shade range. Your new make up must-have, the highly pigmented formula applies with a lacquer-like sheen before setting with a satin finish that lasts for hours without dehydrating lips. Enriched with ‘Maxi-lip’ technology, this luscious lipstick subtly cools and tingles with menthol, leaving lips looking visibly plumper. Even the doe-foot is to die for – basically, there’s nothing about this we’re not obsessed with."
    },
    {
        name: "Pure Passion Eyeshadow Palette", 
        image: "https://cdn.shopify.com/s/files/1/1824/2901/products/PP_Hero1_86cc774c-6c5c-459e-a8c4-bacae1c25896.jpg?v=1540181409",
        description: "Pure Passion Eyeshadow Palette is designed with a coordinated blend of fine-milled lustrous rose golds, and warm berry shadows that can be worn alone or together for infinite classic or edgy eye looks.. This curated palette features 12 mega-pigmented, airbrushed mattes, and shimmer soaked metallics to accentuate and sculpt one-of-a-kind depth and dimension."
    },
    {
        name: "Dose of colour Glazed", 
        image: "https://cdn.shopify.com/s/files/1/1133/6698/products/IMG_7315_1024x1024@2x.JPG?v=1512428714",
        description: "a richly pigmented formula, in-between a matte and creamy finish. It's unique shape allows for a smooth and precise application. "
    }
];
 
function seedDB(){
   //Remove all makeups
   Makeup.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed makeups!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few makeups
            // data.forEach(function(seed){
            //     Makeup.create(seed, function(err, makeup){
            //         if(err){
            //             console.log(err);
            //         } else {
            //             console.log("added a makeup review");
            //             //create a comment
            //             Comment.create(
            //                 {
            //                     text: "Love this product!!",
            //                     author: "Junming"
            //                 }, function(err, comment){
            //                     if(err){
            //                         console.log(err);
            //                     } else {
            //                         makeup.comments.push(comment);
            //                         makeup.save();
            //                         console.log("Created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;

var mongoose = require('mongoose');


var ProductSchema = mongoose.Schema;

var product= new ProductSchema({

    title: {type: String, required:true},
    ImageUrl: {type: String, required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true}
});

 module.exports = mongoose.model('Product', product);



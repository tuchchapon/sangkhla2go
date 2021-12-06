const mongooose = require("mongoose");

const productSchema = {
    
        name : String,
        detail:String,
        fb_page:String,
        link:String,
        tel:String,
        images : Array

}
const Product = mongooose.model('products', productSchema);
module.exports = Product;

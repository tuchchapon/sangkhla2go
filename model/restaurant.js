const mongooose = require("mongoose");

const restaurantSchema = {
    
    catagory_id : String,
    name: String,
    location : String,
    food_type:String,
    recommand_menu: String,
    opening_time: String,
    food_price : String,
    drink_price:String,
    restaurant_images: Array,
    tel:String,
    fb_page:String,
    services : Array
}
const Restaurant = mongooose.model('restaurant', restaurantSchema);
module.exports = Restaurant;

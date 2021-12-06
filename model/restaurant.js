const mongooose = require("mongoose");

const restaurantSchema = {
    
    name: String,
    type:Array,
    location : String,
    recommend_menu: String,
    food_min_price : String,
    food_max_price : String,
    drink_min_price:String,
    drink_max_price :String,
    open_time: String,
    close_time :String,
    services : Array,
    images: Array,
    tel:String,
    fb_page:String,
}
const Restaurant = mongooose.model('restaurant', restaurantSchema);
module.exports = Restaurant;

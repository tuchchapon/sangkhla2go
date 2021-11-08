const mongooose = require("mongoose");

const restaurantSchema = {
    
    catagory_id : String,
    name: String,
    location : String,
    recommand_menu: String,
    opening_time: String,
    min_price : String,
    max_price :String,
    restaurant_images: Array,
    contact : String,
    services : Array
}
const Restaurant = mongooose.model('restaurant', restaurantSchema);
module.exports = Restaurant;

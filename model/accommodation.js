const mongooose = require("mongoose");

const accommodationSchema = {
    type : String,
    name : String,
    information :String,
    min_price:String,
    max_price:String,
    fb_page:String,
    tel:String,
    services : Array,
    images :Array

}
const accommodation = mongooose.model('accommodation', accommodationSchema);
module.exports = accommodation;

const mongooose = require("mongoose");

const accommodationSchema = {
    type_id : String,
    name : String,
    information :String,
    price :Number,
    fb_page:String,
    tel:String,
    services : Array,
    images :Array

}
const accommodation = mongooose.model('accommodation', accommodationSchema);
module.exports = accommodation;

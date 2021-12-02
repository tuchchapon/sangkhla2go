const mongooose = require("mongoose");

const reviewsSchema = {
    
    review_name:String,
    review_link:String,

}
const Reviews = mongooose.model('review', reviewsSchema);
module.exports = Reviews;

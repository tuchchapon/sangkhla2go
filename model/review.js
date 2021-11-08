const mongooose = require("mongoose");

const reviewsSchema = {
    reviewer_name : String,
    reviewer_email : String,
    review_text :String,
    status :String,

}
const Reviews = mongooose.model('review', reviewsSchema);
module.exports = Reviews;

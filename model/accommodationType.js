const mongooose = require("mongoose");

const accommodationTypeSchema = {
    type_name : String,
}
const accommodationType = mongooose.model('accommodationType', accommodationTypeSchema);
module.exports = accommodationType;

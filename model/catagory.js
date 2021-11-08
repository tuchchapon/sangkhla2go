const mongooose = require("mongoose");

const catagorySchema = {
    catagory_name : String,
}
const catagory = mongooose.model('catagory', catagorySchema);
module.exports = catagory;

const mongooose = require("mongoose");

const attractionTypeSchema = {

        name:String

}
const AttractionType = mongooose.model('attractionTypes', attractionTypeSchema);
module.exports = AttractionType;

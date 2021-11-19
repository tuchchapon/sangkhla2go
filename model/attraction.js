const mongooose = require("mongoose");

const attractionSchema = {
    
        type_id : String,
        name : String,
        detail: String,
        images : Array

}
const Attraction = mongooose.model('attraction', attractionSchema);
module.exports = Attraction;

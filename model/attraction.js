const mongooose = require("mongoose");

const attractionSchema = {
    
        type : String,
        name : String,
        detail: String,
        images : Array

}
const Attraction = mongooose.model('attraction', attractionSchema);
module.exports = Attraction;

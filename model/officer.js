const mongooose = require("mongoose");

const officerSchema = {
    
        name : String,
        position : String,
        detail: String,
        image : String

}
const Officer = mongooose.model('officers', officerSchema);
module.exports = Officer;

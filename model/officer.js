const mongooose = require("mongoose");

const officerSchema = {
    
        name : String,
        position : String,
        detail: String,
        image : String,
        fb: String,
        ig:String,
        youtube:String,
        
        

}
const Officer = mongooose.model('officers', officerSchema);
module.exports = Officer;

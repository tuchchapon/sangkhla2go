const mongooose = require("mongoose");

const traditionSchema = {
        name : String,
        local_name:String,
        type: String,
        month: String,
        detail : String,
        images : Array

}
const Tradition = mongooose.model('tradition', traditionSchema);
module.exports = Tradition;

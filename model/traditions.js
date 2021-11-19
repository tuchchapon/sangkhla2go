const mongooose = require("mongoose");

const traditionSchema = {
        name : String,
        tradition_type:String,
        detail : String,
        images : Array

}
const Tradition = mongooose.model('tradition', traditionSchema);
module.exports = Tradition;

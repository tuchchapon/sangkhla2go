const mongooose = require("mongoose");

const driverSchema = {

    location_id:{
        type: mongooose.Schema.Types.ObjectId,
        required:true,
    },
    driver_name : String,
    contact: String,
    driver_images : Array,
    services :Array
}
const Drivers = mongooose.model('drivers', driverSchema);
module.exports = Drivers;

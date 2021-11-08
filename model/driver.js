const mongooose = require("mongoose");

const driverSchema = {
    id : String,
    location_id : String,
    driver_name : String,
    contact: String,
    driver_images : Array
}
const Drivers = mongooose.model('drivers', driverSchema);
module.exports = Drivers;

const mongooose = require("mongoose");

const driverLocationSchema = {
    
    location_name : String,
    location_detail: String
    
}
const DriverLocation = mongooose.model('driverlocation', driverLocationSchema);
module.exports = DriverLocation;

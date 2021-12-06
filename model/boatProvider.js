const mongooose = require("mongoose");

const boatProviderSchema = {

    club_name : String,
    provider_name : String,
    owner_name : String,
    driver_name : String,
    boat_quantity : String,
    max_passenger: String,
    contact: String,
    boat_images : Array,
    provider_image : String
}
const BoatProvider = mongooose.model('BoatProviders', boatProviderSchema);
module.exports = BoatProvider;

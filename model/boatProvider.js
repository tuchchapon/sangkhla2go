const mongooose = require("mongoose");

const boatProviderSchema = {
    boat_club : String,
    provider_name : String,
    owner_name : String,
    boat_quantity : Number,
    max_passenger: Number,
    contact: String,
    boat_images : Array,
    provider_images : Array
}
const BoatProvider = mongooose.model('BoatProviders', boatProviderSchema);
module.exports = BoatProvider;

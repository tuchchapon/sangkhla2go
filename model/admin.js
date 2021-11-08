const mongooose = require("mongoose");

const adminSchema = { 
    email : String,
    password : String,

}
const Admins = mongooose.model('admin', adminSchema);
module.exports = Admins;

const mongooose = require("mongoose");

const adminSchema = {
    email:{   
        type: String,
        unique: true,
        index: true,
        required: true},
        password:String,
        token:String

}
const Admin = mongooose.model('admin', adminSchema);
module.exports = Admin;

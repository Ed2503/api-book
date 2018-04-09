const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    email: "String",
    user: "String",
    password: "String"
})

var Register = mongoose.model('userRegister', registerSchema);

module.exports = Register

const { model, Schema } = require('mongoose')

module.exports = model('Users', new Schema({
    email: String,
    password: String,
    Shed: Array,
}))

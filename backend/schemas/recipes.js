const { model, Schema } = require('mongoose')

module.exports = model('Recipes', new Schema({
    UserID: String,
    ID: String,
    Name: String,
    Description: String,
    Difficulty: String,
    Type: String,
    Time: String,
    Date: String,
    Peoples: String,
    Ingredients: Array,
    Instructions: Array,
}))
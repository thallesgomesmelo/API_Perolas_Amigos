const mongoose = require('mongoose') // Chamando o módulo mongoose
const Schema = mongoose.Schema // Instanciamos o Schema, um objeto do namespace mongoose

// Modelo de schema e exporta um model pelo mongoose
const schema = new Schema({
    friend: {
        type: String,
        required: true,
        trim: true
    },
    mention: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mentions', schema)
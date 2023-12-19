const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    producto: {
        type: String,
        required: [true, "Por favor teclea una descripción del producto"]
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Producto', productoSchema)
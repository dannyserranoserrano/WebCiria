// *****IMPORTAMOS*****
const mongoose = require("mongoose");

// *****CREAMOS EL SCHEMA*****
const PaymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    paySystem:{
        type: String,
        required:true
    }
}, {
    timestamps: true
})

// *****EXPORTAMOS*****
module.exports = mongoose.model("Payment", PaymentSchema)
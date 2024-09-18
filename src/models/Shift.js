const mongoose = require('mongoose');

// Define the Shift Schema
const shiftSchema = new mongoose.Schema({
    shift_name: {
        type: String,
        required: true,
        trim: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    max_seats: {
        type: Number,
        default: 100
    },
    available_seats: {
        type: Number,
        default: 100
    },
    shift_price:{
        type:Number,
        default:300
    },
    discounted_price:{
        type:Number,
        default:200
    },
    shift_type: {
        type: String,
        enum: ['4 Hour Shift', '8 Hour Shift', '12 Hour Shift'],
        required: true
    },
}, { timestamps: true });

const Shift = mongoose.model('Shift', shiftSchema);

module.exports = Shift;

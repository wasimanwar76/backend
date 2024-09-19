const mongoose = require('mongoose');

// Define the Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shift',
        required: true
    },
    subscription_type: {
        type: String,
        enum: ['Monthly', '3 Months', '6 Months', '12 Months'],
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date
    },
    price: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    subscription_status: {
        type: String,
        enum: ['Active', 'Pending', 'Expired', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

// Automatically calculate end date based on subscription type
subscriptionSchema.pre('save', function(next) {
    const durationMap = {
        'Monthly': 1,
        '3 Months': 3,
        '6 Months': 6,
        '12 Months': 12
    };

    const duration = durationMap[this.subscription_type];
    const endDate = new Date(this.start_date);
    endDate.setMonth(endDate.getMonth() + duration);
    this.end_date = endDate;

    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    restaurantId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    countryCode: Number,
    city: String,
    address: String,
    locality: String,
    localityVerbose: String,
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], required: true}
    },
    cuisines: [String],
    averageCostForTwo: Number,
    currency: String,
    hasTableBooking: Boolean,
    hasOnlineDelivery: Boolean,
    isDeliveringNow: Boolean,
    switchToOrderMenu: Boolean,
    priceRange: {type: Number, min: 1, max: 4},
    aggregateRating: {type: Number, min: 1, max: 5},
    ratingColor: String,
    ratingText: String,
    votes: Number,
}, {
    timestamps: true,
});

restaurantSchema.index({location: '2dsphere'});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;

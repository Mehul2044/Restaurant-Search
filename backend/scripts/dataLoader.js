require('dotenv').config();

const fs = require('fs');
const path = require('path');

const csv = require('csv-parser');
const Restaurant = require('../models/Restaurant');

const connectDB = require('../config/db');

const countryMapping = {
    1: "India",
    14: "Australia",
    30: "Brazil",
    37: "Canada",
    94: "Indonesia",
    148: "New Zealand",
    162: "Phillipines",
    166: "Qatar",
    184: "Singapore",
    189: "South Africa",
    191: "Sri Lanka",
    208: "Turkey",
    214: "UAE",
    215: "United Kingdom",
    216: "United States"
};

const loadData = async () => {
    await connectDB.connect();
    try {
        const dataPath = path.join(__dirname, 'zomato.csv');
        const restaurants = [];

        fs.createReadStream(dataPath)
            .pipe(csv())
            .on('data', (row) => {
                const countryCode = Number(row['Country Code']);
                const countryName = countryMapping[countryCode] || 'Unknown';
                restaurants.push({
                    restaurantId: row['Restaurant ID'],
                    name: row['Restaurant Name'],
                    country: countryName,
                    city: row['City'],
                    address: row['Address'],
                    locality: row['Locality'],
                    localityVerbose: row['Locality Verbose'],
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(row['Longitude']), parseFloat(row['Latitude'])]
                    },
                    cuisines: row['Cuisines'].split(',').map(cuisine => cuisine.trim()),
                    averageCostForTwo: Number(row['Average Cost for two']),
                    currency: row['Currency'],
                    hasTableBooking: row['Has Table booking'] === 'Yes',
                    hasOnlineDelivery: row['Has Online delivery'] === 'Yes',
                    isDeliveringNow: row['Is delivering now'] === 'Yes',
                    switchToOrderMenu: row['Switch to order menu'] === 'Yes',
                    priceRange: Number(row['Price range']),
                    aggregateRating: Math.max(1, Number(row['Aggregate rating'])),
                    ratingColor: row['Rating color'].replace(/\s+/g, '').toLowerCase(),
                    ratingText: row['Rating text'],
                    votes: Number(row['Votes']),
                });
            })
            .on('end', async () => {
                try {
                    await Restaurant.deleteMany();
                    await Restaurant.insertMany(restaurants);
                    console.log('Data Imported!');
                    process.exit();
                } catch (error) {
                    console.error(`Error: ${error.message}`);
                    process.exit(1);
                }
            });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

loadData().then();

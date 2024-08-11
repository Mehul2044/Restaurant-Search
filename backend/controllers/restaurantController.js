const {GoogleGenerativeAI} = require("@google/generative-ai")
const Restaurant = require('../models/Restaurant');

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            restaurant.name = restaurant.name.replace(/�/g, 'i');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, 'i'));
            restaurant.city = restaurant.city.replace(/�/g, 'i');
            restaurant.address = restaurant.address.replace(/�/g, 'i');
            res.json(restaurant);
        } else {
            res.status(404).json({message: 'Restaurant not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getRestaurants = async (req, res) => {
    let pageSize = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    if (pageSize > 100) pageSize = 100;

    try {
        const count = await Restaurant.countDocuments();
        const restaurants = await Restaurant.find()
            .select("_id name restaurantId city cuisines currency averageCostForTwo priceRange ratingColor ratingText aggregateRating")
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        const filteredRestaurants = restaurants.map(restaurant => {
            restaurant.name = restaurant.name.replace(/�/g, 'i');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, 'i'));
            restaurant.city = restaurant.city.replace(/�/g, 'i');
            return restaurant;
        });

        res.json({
            count,
            restaurants: filteredRestaurants,
            page,
            pages: Math.ceil(count / pageSize),
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const searchRestaurants = async (req, res) => {
    let pageSize = Number(req.query.limit) || 10;
    const {latitude, longitude, cuisine, country, minCost, maxCost, priceRange, name, page = 1} = req.query;
    const query = {};

    if (!latitude && !longitude && !cuisine && !country && !minCost && !maxCost && !name && !priceRange) {
        return res.status(400).json({message: 'At least one search parameter must be provided.'});
    }

    if (pageSize > 100) pageSize = 100;

    if (latitude && longitude) {
        query['location'] = {
            $geoWithin: {
                $centerSphere: [
                    [longitude, latitude],
                    3 / 6378.1
                ]
            }
        };
    }
    if (cuisine) query.cuisines = {$regex: cuisine, $options: 'i'};
    if (country) query.country = country;
    if (minCost) query.averageCostForTwo = {$gte: minCost};
    if (maxCost) query.averageCostForTwo = {$lte: maxCost};
    if (name) query.name = {$regex: name, $options: 'i'};
    if (priceRange) query.priceRange = priceRange;

    try {
        const skip = (page - 1) * pageSize;
        const restaurants = await Restaurant.find(query)
            .skip(skip)
            .limit(parseInt(pageSize.toString()));

        const filteredRestaurants = restaurants.map(restaurant => {
            restaurant.name = restaurant.name.replace(/�/g, 'i');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, 'i'));
            restaurant.city = restaurant.city.replace(/�/g, 'i');
            return restaurant;
        });

        const total = await Restaurant.countDocuments(query);
        res.json({
            total,
            page: parseInt(page.toString()),
            totalPages: Math.ceil(total / pageSize),
            results: filteredRestaurants
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const imageSearch = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

        const imageBuffer = req.file.buffer.toString("base64");
        const prompt = "Based on the image, please identify the cuisine in a single word. If you cannot determine the cuisine, respond with 'idk'. Do not include full stops and spaces and other characters in the response.";
        const image = {
            inlineData: {
                data: imageBuffer,
                mimeType: req.file.mimetype
            }
        };
        const result = await model.generateContent([prompt, image]);
        const responseText = result.response.text();
        if (responseText.startsWith("idk")) {
            res.json({message: "Unable to determine the cuisine."});
        } else {
            res.json({cuisine: responseText, message: "Success"});
        }
    } catch (error) {
        console.error("Error during image search:", error);
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getRestaurantById,
    getRestaurants,
    searchRestaurants,
    imageSearch,
};

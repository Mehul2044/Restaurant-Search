const Restaurant = require('../models/Restaurant');

const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            restaurant.name = restaurant.name.replace(/�/g, '');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, ''));
            restaurant.city = restaurant.city.replace(/�/g, '');
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
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        const filteredRestaurants = restaurants.map(restaurant => {
            restaurant.name = restaurant.name.replace(/�/g, '');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, ''));
            restaurant.city = restaurant.city.replace(/�/g, '');
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
    const {latitude, longitude, cuisine, country, minCost, maxCost, name, page = 1} = req.query;
    const query = {};

    if (!latitude && !longitude && !cuisine && !country && !minCost && !maxCost && !name) {
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

    try {
        const skip = (page - 1) * pageSize;
        const restaurants = await Restaurant.find(query)
            .skip(skip)
            .limit(parseInt(pageSize.toString()));

        const filteredRestaurants = restaurants.map(restaurant => {
            restaurant.name = restaurant.name.replace(/�/g, '');
            restaurant.cuisines = restaurant.cuisines.map(cuisine => cuisine.replace(/�/g, ''));
            restaurant.city = restaurant.city.replace(/�/g, '');
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
    res.json({message: 'Image search not implemented yet'});
};

module.exports = {
    getRestaurantById,
    getRestaurants,
    searchRestaurants,
    imageSearch,
};

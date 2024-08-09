const express = require('express');
const router = express.Router();

const {
    getRestaurantById,
    getRestaurants,
    searchRestaurants,
    imageSearch,
} = require('../controllers/restaurantController');

router.get('/search', searchRestaurants);
router.post('/image-search', imageSearch);
router.get('/:id', getRestaurantById);
router.get('/', getRestaurants);

module.exports = router;

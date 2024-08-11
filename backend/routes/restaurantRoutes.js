const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer();

const {
    getRestaurantById,
    getRestaurants,
    searchRestaurants,
    imageSearch,
} = require('../controllers/restaurantController');

router.get('/search', searchRestaurants);
router.post('/image-search', upload.single('image'), imageSearch);
router.get('/:id', getRestaurantById);
router.get('/', getRestaurants);

module.exports = router;

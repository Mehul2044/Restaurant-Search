import {Link} from "react-router-dom";

import {Card, CardContent, Typography, Box, Button} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import styles from "./RestaurantCard.module.css";

const priceRangeColors = {
    1: "price-range-1",
    2: "price-range-2",
    3: "price-range-3",
    4: "price-range-4",
    5: "price-range-5"
};

const renderStars = (rating, color) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= rating ? <StarIcon key={i} sx={{color}}/> : <StarBorderIcon key={i} sx={{color}}/>);
    }
    return stars;
};

const getPriceRangeClass = (priceRange) => {
    return styles[priceRangeColors[priceRange]] || styles['price-range-1'];
};

function RestaurantCard({restaurant}) {
    return (
        <Card className={`${styles.card} ${getPriceRangeClass(restaurant.priceRange)}`}>
            <CardContent>
                <Typography variant="h5" gutterBottom>{restaurant.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary"
                            gutterBottom>Cuisine: {restaurant.cuisines.join(", ")}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{restaurant.city}</Typography>
                <Box sx={{display: 'flex', alignItems: 'center', mt: 1}}>
                    {renderStars(restaurant.aggregateRating, restaurant.ratingColor)}
                    <Typography variant="body2" sx={{ml: 1, fontWeight: 'bold', color: "black"}}>
                        {restaurant.aggregateRating} ({restaurant.ratingText})
                    </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Average Cost for Two: {restaurant.averageCostForTwo} {restaurant.currency}
                </Typography>
                <Link to={`/restaurant/${restaurant._id}`} style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary" sx={{mt: 2}}>View Details</Button>
                </Link>
            </CardContent>
        </Card>
    );
}

export default RestaurantCard;
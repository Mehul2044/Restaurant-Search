import {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

import {Box, Typography, Card, CardContent, Grid, Divider, Button,} from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MapIcon from "@mui/icons-material/Map";

import restaurantImage1 from "../assets/restaurant1.webp";
import {backendUrl} from "../utils/constants.js";

function RestaurantDetail() {
    const {id} = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigator = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`${backendUrl}/${id}`);
                const data = await response.json();
                setRestaurant(data);
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurant().then();
    }, [id]);

    if (loading) {
        return (
            <Typography variant="h4" align="center">
                Loading...
            </Typography>
        );
    }

    if (!restaurant) {
        return (
            <Typography variant="h4" align="center">
                Restaurant Not Found!!
            </Typography>
        );
    }

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    sx={{color: i < rating ? "#FFD700" : "#E0E0E0"}}
                />
            );
        }
        return stars;
    };

    const renderPriceRange = (priceRange) => {
        const dollars = [];
        for (let i = 0; i < 4; i++) {
            dollars.push(
                <AttachMoneyIcon
                    key={i}
                    sx={{color: i < priceRange ? "#4CAF50" : "#b4adad"}}
                />
            );
        }
        return dollars;
    };

    return (
        <Box
            sx={{
                height: "100vh",
                backgroundImage: `url(${restaurantImage1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }}>
            <Card
                sx={{
                    width: "90%",
                    maxHeight: "90%",
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    color: "black",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    p: 4,
                }}>
                <CardContent sx={{flex: 1}}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        align="center"
                        sx={{mb: 4, fontWeight: "bold"}}>
                        {restaurant.name}
                    </Typography>
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        align="center"
                        sx={{mb: 4}}>
                        {restaurant.address}
                    </Typography>
                    <Divider sx={{mb: 4}}/>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                <LocationCityIcon sx={{verticalAlign: "middle", mr: 1, color: "#4CAF50"}}/>
                                <strong style={{color: "#4CAF50"}}>City:</strong> {restaurant.city}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <PublicIcon sx={{verticalAlign: "middle", mr: 1, color: "#FF9800"}}/>
                                <strong style={{color: "#FF9800"}}>Country Code:</strong> {restaurant.countryCode}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <RestaurantMenuIcon sx={{verticalAlign: "middle", mr: 1, color: "#009688"}}/>
                                <strong style={{color: "#009688"}}>Cuisines:</strong> {restaurant.cuisines.join(", ")}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                <CurrencyExchangeIcon sx={{verticalAlign: "middle", mr: 1, color: "#673AB7"}}/>
                                <strong style={{color: "#673AB7"}}>Average Cost for
                                    Two:</strong> {restaurant.averageCostForTwo} {restaurant.currency}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <strong style={{color: "#4CAF50"}}>Price Range:</strong>
                                <Box sx={{display: "inline-flex", ml: 1}}>
                                    {renderPriceRange(restaurant.priceRange)}
                                </Box>
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <StarIcon sx={{verticalAlign: "middle", mr: 1, color: "#FFD700"}}/>
                                <strong
                                    style={{color: "#FFD700"}}>Rating:</strong> {restaurant.aggregateRating} ({restaurant.ratingText})
                                <Box sx={{display: "inline-flex", ml: 1}}>
                                    {renderRatingStars(restaurant.aggregateRating)}
                                </Box>
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <ThumbUpIcon sx={{verticalAlign: "middle", mr: 1, color: "#3F51B5"}}/>
                                <strong style={{color: "#3F51B5"}}>Votes:</strong> {restaurant.votes}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                <TableRestaurantIcon sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                    color: restaurant.hasTableBooking ? "green" : "red"
                                }}/>
                                <strong style={{color: restaurant.hasTableBooking ? "green" : "red"}}>Has Table
                                    Booking:</strong>{" "}
                                {restaurant.hasTableBooking ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <MapIcon sx={{verticalAlign: "middle", mr: 1, color: "#2196F3"}}/>
                                <strong style={{color: "#2196F3"}}>Location:</strong>{" "}
                                <Link
                                    to={`https://www.google.com/maps/search/?api=1&query=${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{color: "#2196F3", textDecoration: "none"}}>
                                    View on Google Maps
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>
                                <DeliveryDiningIcon sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                    color: restaurant.hasOnlineDelivery ? "green" : "red"
                                }}/>
                                <strong style={{color: restaurant.hasOnlineDelivery ? "green" : "red"}}>Has Online
                                    Delivery:</strong>{" "}
                                {restaurant.hasOnlineDelivery ? "Yes" : "No"}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                <LocalShippingIcon sx={{
                                    verticalAlign: "middle",
                                    mr: 1,
                                    color: restaurant.isDeliveringNow ? "#4CAF50" : "#F44336"
                                }}/>
                                <strong style={{color: restaurant.isDeliveringNow ? "#4CAF50" : "#F44336"}}>Is
                                    Delivering Now:</strong>{" "}
                                {restaurant.isDeliveringNow ? "Yes" : "No"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <Box sx={{p: 2, textAlign: "center"}}>
                    <Button variant="contained" color="primary" onClick={() => navigator(-1)}>Go Back</Button>
                </Box>
            </Card>
        </Box>
    );
}

export default RestaurantDetail;

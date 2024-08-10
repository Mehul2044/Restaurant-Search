import {useEffect, useState} from "react";
import {Grid, CircularProgress, Box, Typography} from "@mui/material";

import {backendUrl} from "../utils/constants.js";

import RestaurantCard from "../components/RestaurantCard.jsx";
import PriceIndex from "../components/PriceIndex.jsx";
import PaginationComponent from "../components/Pagination.jsx";

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(`${backendUrl}/?page=${page}&limit=8`);
                const data = await response.json();
                setRestaurants(data.restaurants);
                setTotalPages(data.pages);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        fetchRestaurants().then();
    }, [page]);

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" sx={{mb: 4}} align="center">Zomato Restaurant Lists</Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="51vh">
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {restaurants.map((restaurant) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant._id}>
                                <RestaurantCard restaurant={restaurant}/>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
            <PriceIndex/>
            <PaginationComponent totalPages={totalPages} page={page} setPage={setPage}/>
        </>
    );
}

export default HomePage;
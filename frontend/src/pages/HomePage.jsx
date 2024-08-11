import {useEffect, useState} from "react";
import {Grid, CircularProgress, Box, Typography} from "@mui/material";

import {backendUrl} from "../utils/constants.js";
import RestaurantCard from "../components/RestaurantCard.jsx";
import PriceIndex from "../components/PriceIndex.jsx";
import PaginationComponent from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";

function HomePage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState(5);
    const [country, setCountry] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                let url = `${backendUrl}/search?page=${page}&limit=8&priceRange=${priceRange}`;
                if (country) url += `&country=${country}`;
                if (cuisine) url += `&cuisine=${cuisine}`;
                if (searchQuery) url += `&name=${searchQuery}`;

                const response = await fetch(url);
                const data = await response.json();
                setRestaurants(data.restaurants || data.results);
                setTotalPages(data.pages || data.totalPages);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        fetchRestaurants().then();
    }, [page, priceRange, country, cuisine, searchQuery]);

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" sx={{mb: 4}} align="center">Zomato Restaurant Lists</Typography>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} country={country}
                           setCountry={setCountry} cuisine={cuisine} setCuisine={setCuisine} setPage={setPage}
                           isCountry={true} isCuisine={true}/>
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
            <PriceIndex setPriceRange={setPriceRange} setPage={setPage}/>
            <PaginationComponent totalPages={totalPages} page={page} setPage={setPage}/>
        </>
    );
}

export default HomePage;

import {useEffect, useState} from "react";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";

import {MapContainer, TileLayer, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {backendUrl} from "../utils/constants.js";
import RestaurantCard from "../components/RestaurantCard.jsx";
import PriceIndex from "../components/PriceIndex.jsx";
import PaginationComponent from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";

function LocationSearch() {
    const [latitude, setLatitude] = useState(28.6273928);
    const [longitude, setLongitude] = useState(77.1716954);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [priceRange, setPriceRange] = useState(5);
    const [country, setCountry] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                let url = `${backendUrl}/search?latitude=${latitude}&longitude=${longitude}&page=${page}&limit=8&priceRange=${priceRange}`;
                if (cuisine) url += `&cuisine=${cuisine}`;
                if (searchQuery) url += `&name=${searchQuery}`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setTotalPages(data.totalPages);
                    setRestaurants(data.results);
                } else {
                    console.error("Failed to fetch restaurants.");
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };
        setLoading(true);
        fetchRestaurants().then(() => setLoading(false));
    }, [latitude, longitude, page, priceRange, cuisine, searchQuery]);


    const handleMapCreated = (map) => {
        const target = map.target;
        if (target) {
            const geocoder = L.Control.Geocoder.nominatim();
            const geocoderControl = L.Control.geocoder({
                geocoder: geocoder,
                defaultMarkGeocode: false,
            }).on("markgeocode", function (e) {
                const center = e.geocode.center;
                target.setView(center, 10);
                setLatitude(center.lat);
                setLongitude(center.lng);
            });

            const geocoderElement = geocoderControl.addTo(target).getContainer();
            geocoderElement.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.5)";
            geocoderElement.style.borderRadius = "8px";
            geocoderElement.style.padding = "5px";
        } else {
            console.error("Map instance is undefined. Geocoder control not added.");
        }
    };

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" sx={{mb: 4}} align="center">Pick Location from the Map</Typography>
            </Box>
            <MapContainer
                center={[latitude, longitude]}
                zoom={10}
                whenReady={handleMapCreated}
                style={{
                    height: "40vh",
                    width: "85vw",
                    margin: "0 auto",
                    borderRadius: "8px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)"
                }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {latitude && longitude && (
                    <Marker position={[latitude, longitude]}/>
                )}
            </MapContainer>
            <Box sx={{p: 4}}>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} country={country}
                           setCountry={setCountry} cuisine={cuisine} setCuisine={setCuisine} setPage={setPage}
                           isCountry={false} isCuisine={true}/>
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

export default LocationSearch;

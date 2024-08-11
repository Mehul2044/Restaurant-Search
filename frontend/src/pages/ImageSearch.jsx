import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Typography, CircularProgress, Grid, Button, Divider} from "@mui/material";
import {useDropzone} from "react-dropzone";

import {backendUrl} from "../utils/constants.js";
import RestaurantCard from "../components/RestaurantCard.jsx";
import PriceIndex from "../components/PriceIndex.jsx";
import PaginationComponent from "../components/Pagination.jsx";

function ImageSearch() {
    const [cuisine, setCuisine] = useState("French");
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [restaurants, setRestaurants] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch(`${backendUrl}/search?page=${page}&limit=8&cuisine=${cuisine}`);
                const data = await response.json();
                setRestaurants(data.results);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }
        setLoading(true);
        fetchRestaurants().then(() => setLoading(false));
    }, [cuisine, page]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: (acceptedFiles) => {
            const selectedFile = acceptedFiles[0];
            setImage(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        },
        accept: "image/*",
        maxFiles: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append("image", image);

        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/image-search`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            const data = response.data;
            if (data.message === "Success") {
                setCuisine(data.cuisine);
            } else {
                alert("Food Item could not be identified!");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error during image search:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h4" sx={{mb: 4}} align="center">
                    Choose an Image to Search Restaurants
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center"
                      sx={{maxWidth: '80%', margin: '0 auto'}}>
                    {/* Drag and Drop Area */}
                    <Grid item xs={12} md={5}>
                        <Box
                            {...getRootProps()}
                            sx={{
                                p: 4,
                                border: "2px dashed #009688",
                                borderRadius: "10px",
                                textAlign: "center",
                                backgroundColor: isDragActive ? "#e0f7fa" : "#fafafa",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                                minHeight: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <input {...getInputProps()} />
                            <Typography variant="body1" color="textSecondary">
                                {image ? (
                                    <>
                                        {image.name}
                                        <br />
                                        Drag new Image Here...
                                    </>
                                ) : isDragActive ? (
                                    "Drop the files here ..."
                                ) : (
                                    "Drag 'n' drop an image here, or click to select one"
                                )}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} display="flex" justifyContent="center" alignItems="center">
                        {imagePreview ? (
                            <Box>
                                <Box
                                    component="img"
                                    src={imagePreview}
                                    alt="Selected"
                                    sx={{
                                        width: "400px",
                                        height: "200px",
                                        borderRadius: "8px",
                                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)"
                                    }}/>
                            </Box>
                        ) : (
                            <Typography variant="body1" color="textSecondary" textAlign="center">
                                No image selected
                            </Typography>
                        )}
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="center" mt={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!image}>
                        Search
                    </Button>
                </Box>
            </form>
            <Box sx={{p: 4}}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="51vh">
                        <CircularProgress/>
                    </Box>
                ) : (
                    <>
                        <Typography variant="h6" sx={{mb: 4}}>
                            Cuisine Search: <strong style={{color: "#009688"}}>{cuisine}</strong>
                        </Typography>
                        {restaurants.length === 0 ? (
                            <Typography variant="body1" align="center" color="textSecondary">
                                No restaurants found with the cuisine "{cuisine}".
                            </Typography>
                        ) : (
                            <Grid container spacing={4}>
                                {restaurants.map((restaurant) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={restaurant._id}>
                                        <RestaurantCard restaurant={restaurant}/>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
            {restaurants.length !== 0 && <PriceIndex/>}
            <PaginationComponent totalPages={totalPages} page={page} setPage={setPage}/>
            <div style={{height: "3rem"}}></div>
        </>
    );
}

export default ImageSearch;
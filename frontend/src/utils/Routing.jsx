import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import RestaurantDetail from "../pages/RestaurantDetail.jsx";
import LocationSearch from "../pages/LocationSearch.jsx";
import ImageSearch from "../pages/ImageSearch.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import Navbar from "../components/Navbar.jsx";

function Routing() {
    const location = useLocation();
    const hideNavbar = location.pathname.startsWith("/restaurant/");

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                <Route path="/search-location" element={<LocationSearch />} />
                <Route path="/image-search" element={<ImageSearch />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}

export default Routing;
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";

function SearchBar({
                       searchQuery,
                       setSearchQuery,
                       country,
                       setCountry,
                       cuisine,
                       setCuisine,
                       setPage,
                       isCuisine,
                       isCountry
                   }) {
    const handleReset = () => {
        setSearchQuery('');
        if (isCountry) setCountry('');
        if (isCuisine) setCuisine('');
        setPage(1);
    };

    return <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={4}>
        <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => {
                setPage(1);
                setSearchQuery(e.target.value);
            }}
            sx={{width: '300px'}}/>
        {isCountry && <FormControl sx={{minWidth: 120}}>
            <InputLabel>Country</InputLabel>
            <Select
                value={country}
                onChange={(e) => {
                    setPage(1);
                    setCountry(e.target.value);
                }}
                label="Country">
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Brazil">Brazil</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Indonesia">Indonesia</MenuItem>
                <MenuItem value="New Zealand">New Zealand</MenuItem>
                <MenuItem value="Phillipines">Phillipines</MenuItem>
                <MenuItem value="Singapore">Singapore</MenuItem>
                <MenuItem value="South Africa">South Africa</MenuItem>
                <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
                <MenuItem value="Turkey">Turkey</MenuItem>
                <MenuItem value="UAE">UAE</MenuItem>
                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
            </Select>
        </FormControl>}
        {isCuisine && <FormControl sx={{minWidth: 120}}>
            <InputLabel>Cuisine</InputLabel>
            <Select
                value={cuisine}
                onChange={(e) => {
                    setPage(1);
                    setCuisine(e.target.value);
                }}
                label="Cuisine">
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Thai">Thai</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
                <MenuItem value="Greek">Greek</MenuItem>
                <MenuItem value="Lebanese">Lebanese</MenuItem>
                <MenuItem value="Turkish">Turkish</MenuItem>
                <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                <MenuItem value="Korean">Korean</MenuItem>
                <MenuItem value="Mediterranean">Mediterranean</MenuItem>
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Brazilian">Brazilian</MenuItem>
                <MenuItem value="Moroccan">Moroccan</MenuItem>
            </Select>
        </FormControl>}
        <Button variant="contained" color="secondary" onClick={handleReset}>Reset</Button>
    </Box>;
}

export default SearchBar;
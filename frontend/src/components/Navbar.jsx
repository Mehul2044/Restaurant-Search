import {AppBar, Toolbar, Typography, Button, Box, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";

function Navbar() {
    const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <AppBar position="static" sx={{backgroundColor: "#3f51b5", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                {!isMobile && <Typography variant="h6" sx={{flexGrow: 1, fontWeight: "bold", color: "#fff"}}>Zomato
                    Restaurants</Typography>}
                <Box sx={{display: "flex", gap: 2}}>
                    <Button color="inherit" component={Link} to="/" replace={true}
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                                }
                            }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/search-location" replace={true}
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                                }
                            }}>
                        Location Search
                    </Button>
                    <Button color="inherit" component={Link} to="/image-search" replace={true}
                            sx={{
                                color: "#fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.2)"
                                }
                            }}>
                        Image Search
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
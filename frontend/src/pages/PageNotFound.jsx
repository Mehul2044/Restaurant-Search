import {Box, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <Box
            sx={{
                height: "93vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                backgroundColor: "#f7f7f7",
                flexDirection: "column",
                p: 4
            }}>
            <Typography variant="h1" sx={{fontSize: "10rem", fontWeight: "bold", color: "#ff6b6b"}}>404</Typography>
            <Typography variant="h4" sx={{mb: 2}}>Oops! Page Not Found</Typography>
            <Typography variant="body1" color="textSecondary" sx={{mb: 4}}>
                The page you are looking for might have been removed or is temporarily unavailable.
            </Typography>
            <Box sx={{mt: 4}}>
                <Link to="/" style={{textDecoration: "none"}}>
                    <Button variant="contained" color="primary" sx={{p: 1.5, px: 4, fontSize: "1rem"}}>
                        Go to Home
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default PageNotFound;

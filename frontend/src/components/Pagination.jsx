import {Box, Pagination, useMediaQuery, useTheme} from "@mui/material";

function PaginationComponent({totalPages, page, setPage}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}
             flexDirection={isMobile ? 'column' : 'row'}>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
                size={isMobile ? "small" : "large"}
            />
        </Box>
    );
}

export default PaginationComponent;
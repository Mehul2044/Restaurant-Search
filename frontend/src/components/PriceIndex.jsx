import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import styles from "./RestaurantCard.module.css";

function PriceIndex({setPriceRange, setPage}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const priceRangeColors = {
        1: "price-range-1",
        2: "price-range-2",
        3: "price-range-3",
        4: "price-range-4",
        5: "price-range-5"
    };

    const priceRangeLabels = {
        1: "Least Expensive",
        2: "Less Expensive",
        3: "More Expensive",
        4: "Most Expensive",
        5: "All"
    };

    const clickHandler = (range) => {
        setPage(1);
        setPriceRange(range);
    }

    return (
        <Box className={styles.indexContainer} sx={{flexDirection: isMobile ? 'column' : 'row'}}>
            {Object.entries(priceRangeColors).map(([range, className]) => (
                <Box key={range} className={`${styles.indexItem} ${styles[className]}`}
                     onClick={() => clickHandler(range)}>
                    <Typography variant="body2">{priceRangeLabels[range]}</Typography>
                </Box>
            ))}
        </Box>
    );
}

export default PriceIndex;
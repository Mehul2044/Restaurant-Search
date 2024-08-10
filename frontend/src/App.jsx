import Routing from "./utils/Routing.jsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme();

function App() {

    return <>
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Routing/>
            </CssBaseline>
        </ThemeProvider>
    </>;
}

export default App;

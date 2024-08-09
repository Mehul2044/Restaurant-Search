require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/restaurants", require('./routes/restaurantRoutes'));

app.listen(process.env.PORT, async () => {
    await connectDB.connect()
    console.log(`Server is running on port ${PORT}`);
});
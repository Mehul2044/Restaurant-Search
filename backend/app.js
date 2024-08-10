require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({origin: ["http://localhost:5173"]}));

app.get("/", function (req, res) {
    res.send({message: "Welcome to Restaurant API!"});
});

app.use("/api/restaurants", require('./routes/restaurantRoutes'));

app.get("*", function (req, res) {
   res.send({message: "No valid request found!"});
});

app.listen(process.env.PORT, async () => {
    await connectDB.connect();
    console.log(`Server is running on port ${PORT}`);
});
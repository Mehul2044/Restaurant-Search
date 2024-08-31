### Project: Zomato Restaurant Listing & Searching

## Overview

This project is a full-stack application that allows users to search and list restaurants using data from Zomato. The
application includes a web API service and a web-based user interface.

## Key Features

- **Data Loading**: Script to load Zomato restaurant data into a database.
- **Web API Service**: Endpoints to retrieve restaurant data.
- **User Interface**: Web application to display and search restaurants.

## Technologies Used

- **Frontend**: React, React Router, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **Other**: Multer, dotenv, cors

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Steps

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies**:
    ```bash
   cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add the following:
    ```plaintext
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    GEMINI_API_KEY=<your-gemini-api-key>
    ```

4. **Load data into the database**:
   Run the data loading script to populate the database with Zomato restaurant data.
    ```bash
    cd backend
    node scripts/dataLoader.js
    ```

5. **Start the backend server**:
    ```bash
    cd backend
    npm start
    ```

6. **Start the frontend server**:
    ```bash
    cd frontend
    npm run dev
    ```

## API Endpoints

- **Get Restaurant by ID**: `GET /api/restaurants/:id`
- **Get List of Restaurants**: `GET /api/restaurants`
- **Search Restaurants**: `GET /api/restaurants/search`
- **Image Search**: `POST /api/restaurants/image-search`

## User Interface Pages

- **Restaurant List Page**: Displays a list of restaurants.
- **Restaurant Detail Page**: Shows details of a specific restaurant.
- **Location Search**: Search restaurants within a given latitude and longitude range.
- **Image Search**: Upload an image to search for restaurants offering similar cuisines.

## Additional Features

- **Filtering Options**:
    - By Country
    - By Average Spend for Two People
    - By Cuisines
- **Search Functionality**: Search for restaurants by name and description.

## Project Structure

```plaintext
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── app.js
│   └── scripts
│       └── dataLoader.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── assets
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ...
│   ├── public
│   └── ...
└── README.md
```

## Acknowledgements

- Zomato for providing the restaurant data.
- [Kaggle](https://www.kaggle.com/datasets/shrutimehta/zomato-restaurants-data) for hosting the dataset.
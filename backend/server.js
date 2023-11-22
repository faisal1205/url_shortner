// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
require("dotenv").config();
const bodyParser = require('body-parser');
const urlRoutes = require('./routes/urlRoutes');
const { connectToMongoDB } = require("./connect");

const app = express();
const PORT = process.env.PORT || 8001; // Use the assigned port or a default one
app.use(cors({
  origin:["https://url-shortner-backend-three.vercel.app"],
  methods:["GET","POST"],
  credentials:true,
})); // Enable CORS for all routes
// Serve static files from the 'frontend' folder
app.use(express.static('frontend'));
app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:8001/urlShortnerFM', { useNewUrlParser: true, useUnifiedTopology: true });
connectToMongoDB(process.env.MONGODB_CONNECT_URL).then(() => {
    console.log("MongoDB connected");
    // Start your server after successfully connecting to MongoDB
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    // You might want to gracefully handle the error, exit the application, or take other actions.
  });



app.use('/api', urlRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



























// const express = require("express");
// const bodyParser = require("body-parser");
// const shortid = require("shortid"); // Use shortid for generating short IDs
// const app = express();

// app.use(bodyParser.json());
// const cors = require("cors");
// app.use(cors());

// const urlDatabase = {};
// // console.log(urlDatabase)
// app.post("/shorten", (req, res) => {
//     console.log(urlDatabase)
//     const { originalURL } = req.body;
//     const shortID = shortid.generate(); // Generate a unique short ID using shortid

//     urlDatabase[shortID] = originalURL;
//     console.log(originalURL)
//     const shortenedURL = `http://localhost:5000/${shortID}`; // Replace with your domain

//     res.json({ shortenedURL });
// });

// app.get("/", (req, res) => {
//     res.send("Hello");
// });

// app.get("/:shortID", (req, res) => {
//     const { shortID } = req.params;
//     const originalURL = urlDatabase[shortID];
//     if (originalURL) {
//         res.redirect(originalURL);
//     } else {
//         res.status(404).send("URL not found");
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

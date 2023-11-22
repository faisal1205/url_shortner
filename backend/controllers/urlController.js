// controllers/urlController.js
const Url = require('../models/url');
const shortid = require("shortid");

const urlController = {
    hello :(req,res) =>{
        res.status(200).json({message:"helloworld"})
    },
    generateShortUrl: () => {
      //  console.log("hi")
        // Replace this with your logic to generate a unique short URL
     //  return Math.random().toString(36).substring(2, 8);
       return shortid.generate();
    },
    createUrl: async (req, res) => {
        console.log(req.body)
        // Implement URL creation logic
        try {
            const { longUrl, expiryDate, title, description } = req.body;
           
            // Check if the longUrl is provided and valid
            if (!longUrl || typeof longUrl !== 'string' ) {
                return res.status(400).json({ error: 'Invalid or missing longUrl in the request body' });
            }

            // Check if the provided longUrl already exists
            const existingUrl = await Url.findOne({ longUrl });
             if (existingUrl) {
                // If URL exists, return the existing short URL
                return res.json({ shortenedURL: existingUrl.shortUrl });
            }

            // Generate short URL
            const shortUrl = urlController.generateShortUrl();

            const url = new Url({
                longUrl,
                shortUrl,
                expiryDate,
                title,
                description,
            });

            await url.save();

            res.json({ shortenedURL: url.shortUrl });
        } catch (error) {
            console.error('Error creating URL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    redirectToOriginalUrl: async (req, res) => {
        try {
            const { shortUrl } = req.params;
            const referrer = req.headers.referer || req.headers.referrer || null;
            console.log("referrer", referrer);
            const urlDetails = await Url.findOne({ shortUrl });
  


            if (!urlDetails) {
                // console.log("redirect")
                return res.status(404).json({ error: 'URL not found' });
            }

            // Update visit information
            urlDetails.visitors.push({
                ip: req.ip, // Assuming you're using Express and have middleware to get IP
                timestamp: new Date(),
                referrer,
            });

            await urlDetails.save();

            // Redirect to the original URL
            return res.redirect(urlDetails.longUrl);
        } catch (error) {
            console.error('Error redirecting to original URL:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getAllUrls: async (req, res) => {
        try {
            const allUrls = await Url.find();
            if (allUrls.length === 0) {
                return res.status(404).json({ error: 'No URLs found' });
            }
            res.json(allUrls);
        } catch (error) {
            console.error('Error fetching all URLs:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    updateUrlExpiry: async (req, res) => {
        try {
            const { shortUrl } = req.params;
            const { expiryDate } = req.body;

            const urlDetails = await Url.findOne({ shortUrl });

            if (!urlDetails) {
                return res.status(404).json({ error: 'URL not found' });
            }

            urlDetails.expiryDate = expiryDate;
            await urlDetails.save();

            res.json({ message: 'URL expiry date updated successfully' });
        } catch (error) {
            console.error('Error updating URL expiry date:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteUrl: async (req, res) => {
        // Implement deleting URL logic
        try {
            const { shortUrl } = req.params;

            // Check if the URL exists
            const urlDetails = await Url.findOne({ shortUrl });

            if (!urlDetails) {
                return res.status(404).json({ error: 'URL not found' });
            }

            // Implement additional checks, e.g., user authentication if needed

            // Delete the URL
            await Url.deleteOne({ _id: urlDetails._id });

            res.json({ message: 'URL deleted successfully' });
        } catch (error) {
            console.error('Error deleting URL:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getUrlDetails: async (req, res) => {
        // Implement getting URL details logic
        try {
            const { shortUrl } = req.params;

            const urlDetails = await Url.findOne({ shortUrl });

            if (!urlDetails) {
                return res.status(404).json({ error: 'URL not found' });
            }

            res.json(urlDetails);
        } catch (error) {
            console.error('Error fetching URL details:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getAllVisitors: async (req, res) => {
        // Implement getting all visitors logic
        try {
            const { shortUrl } = req.params;

            const urlDetails = await Url.findOne({ shortUrl });

            if (!urlDetails) {
                return res.status(404).json({ error: 'URL not found' });
            }

            res.json(urlDetails.visitors);
        } catch (error) {
            console.error('Error fetching visitors:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },




};

module.exports = urlController;

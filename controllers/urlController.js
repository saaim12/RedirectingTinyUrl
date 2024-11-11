// controllers/shortUrl.controller.js
import { nanoid } from 'nanoid';
import moment from 'moment';
import { Url } from '../models/Url';

export const shorten = async (req, res) => {
    const { url } = req.body;
    
    // Validate URL
    if (!url || !/^https?:\/\/.+/.test(url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const shortId = nanoid(8); // Generate unique short ID
    const shortUrl = `${req.protocol}://${req.get('host')}/s/${shortId}`; // Short URL format
    const expiry = moment().add(1, 'hour').toISOString(); // Expiry set to 1 hour from now

    // Save URL data to database
    const newUrl = await Url.create({
        originalUrl: url,
        shortId,
        shortUrl,
        expiry
    });

    // Return the shortened URL in the response
    res.status(200).json({
        originalUrl: url,
        shortUrl,
        expiry
    });
};

export const redirectUrl = async (req, res) => {
    try {
        const { shortId } = req.params;

        // Find the URL record by shortId
        const urlRecord = await Url.findOne({ where: { shortId } });

        // Check if the URL record exists
        if (!urlRecord) {
            return res.status(404).json({ message: 'URL not found' });
        }

        // Check if the URL has expired
        const expiry = moment(urlRecord.expiry);
        if (expiry.isBefore(moment())) {
            return res.status(404).json({ message: 'URL has expired' });
        }

        // Redirect to the original URL
        res.redirect(urlRecord.originalUrl);

    } catch (error) {
        // Handle any other errors
        console.error("Error redirecting URL:", error);
        res.status(500).json({ message: "An error occurred during redirection" });
    }
};

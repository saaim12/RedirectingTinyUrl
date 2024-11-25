import { URL } from "../models/URL.js";
import { nanoid } from "nanoid"; // For generating short IDs
import axios from "axios";

// Generate a short URL
export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    const shortUrl = nanoid(8); // Generate an 8-character hash
    await URL.create({ longUrl, shortUrl });

    res.json({ longUrl, shortUrl: `http://localhost:3000/${shortUrl}` });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Redirect to the long URL

export const redirectToLongUrl = async (req, res) => {
    try {
      const { hash } = req.params;
  
      // Fetch the URL data from the database
      const urlData = await URL.findOne({ where: { shortUrl: hash } });
  
      if (!urlData) {
        return res.status(404).json({ message: "Short URL not found" });
      }
  
      // Fetch the content of the long URL
      const response = await axios.get(urlData.longUrl);
  
      // Set headers from the fetched URL's response
      res.set(response.headers);
  
      // Send the content of the long URL
      res.send(response.data);
    } catch (error) {
      console.error("Error fetching long URL content:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  export const getOriginalUrl = async (req, res) => {
    try {
      const { hash } = req.params;
  
      // Validate the hash
      if (!hash) {
        return res.status(400).json({ message: "Hash parameter is missing" });
      }
  
      // Fetch the URL data from the database
      const urlData = await URL.findOne({ where: { shortUrl: hash } });
  
      if (!urlData) {
        return res.status(404).json({ message: "Short URL not found" });
      }
  
      // Respond with the original long URL
      return res.status(200).json({ longUrl: urlData.longUrl });
    } catch (error) {
      console.error("Error fetching original URL:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
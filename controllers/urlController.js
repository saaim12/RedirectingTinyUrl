import { URL } from "../models/URL.js";
import { nanoid } from "nanoid"; // For generating short IDs
import axios from "axios";

// Generate a short URL
export const shortenUrl = async (req, res) => {
  try {
    const { url } = req.body; // Accessing the url directly from the request body

    if (!url) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    const shortUrl = nanoid(8); // Generate an 8-character short URL
    await URL.create({ longUrl: url, shortUrl }); // Assuming you have a URL model to save the data

    // Log the mapping of short URL to long URL
    console.log(`HashMap: shortUrl =>  ${shortUrl} longUrl:=> ${url}`);

    // Return the long and short URL in the response
    res.json({ longUrl: url, shortUrl: `http://localhost:3000/${shortUrl}` });
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

    // Log the current mapping fetched from DB (HashMap)
    console.log(`HashMap: shortUrl => longUrl: ${hash} => ${urlData.longUrl}`);

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

// Get the original long URL based on short URL hash
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

    // Log the mapping of short URL to long URL
    console.log(`HashMap: shortUrl => longUrl: ${hash} => ${urlData.longUrl}`);

    // Respond with the original long URL
    return res.status(200).json({ longUrl: urlData.longUrl });
  } catch (error) {
    console.error("Error fetching original URL:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

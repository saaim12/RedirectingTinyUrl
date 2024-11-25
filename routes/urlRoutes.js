import express from "express";
import { shortenUrl, redirectToLongUrl,getOriginalUrl } from "../controllers/urlController.js";

const router = express.Router();

// Route to shorten a URL
router.post("/shorten", shortenUrl);

// Route to redirect to the long URL
router.get("/:hash", redirectToLongUrl);
// Route to fetch the original long URL and then send its data to the shorlt url
router.get("/fetch/:hash", getOriginalUrl);

export default router;

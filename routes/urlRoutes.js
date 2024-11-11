import { Router } from "express"; 
import { redirectUrl, shorten } from "../controllers/urlController";

const router = Router();
router.post("/shorten", shorten)
router.get("/s/:shortId", redirectUrl)


export default router;
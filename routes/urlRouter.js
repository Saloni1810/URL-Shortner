import express from 'express';
import {createShortUrl, getUrl, getAnalytics}   from "../controllers/urlController.js"

const router = express.Router();

router.post("/", createShortUrl)

router.get("/:shortId" , getUrl) 

router.get("/analytics/:shortId", getAnalytics)

export default router;
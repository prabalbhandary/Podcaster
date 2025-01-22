const express = require("express");
const { createPodcast, getPodcasts, getUserPodcast, getPodcast, getPodcastByCategory } = require("../controllers/podcastController");
const upload = require("../middlewares/multer");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, upload, createPodcast);
router.get("/get-podcasts", getPodcasts);
router.get("/get-user-podcast", authMiddleware, getUserPodcast);
router.get("/get-podcasts/:id", authMiddleware, getPodcast);
router.get("/category/:cat", authMiddleware, getPodcastByCategory);

module.exports = router;
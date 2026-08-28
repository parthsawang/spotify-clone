const express = require("express");
const musicController = require("../controller/music.controller");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const musicRouter = express.Router();

musicRouter.post(
    "/upload",
    upload.single("music"),
    musicController.createMusic
);

musicRouter.post(
    "/album",
    upload.array("songs", 10),
    musicController.createAlbum
);

module.exports = musicRouter;
const express = require("express");
const musicController = require("../controller/music.controller");
const {authUser} = require("../middlewares/auth.middleware");
const {authArtist} = require("../middlewares/auth.middleware")
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const musicRouter = express.Router();



musicRouter.post(
    "/upload",authArtist,
    upload.single("music"),
    musicController.createMusic
);

musicRouter.post(
    "/album",authArtist,
    upload.array("songs", 10),
    musicController.createAlbum
);


musicRouter.get(
    "/",
    musicController.getMusicById
);



module.exports = musicRouter;
const express = require('express');
const musicController = require('../controller/music.controller');


const router = Router.express();

router.post("/upload", musicController.createMusic)


module.exports = router;




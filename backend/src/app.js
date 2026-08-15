const express = require('express');
const cookieeParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieeParser());


module.exports = app;
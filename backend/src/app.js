const express = require('express');
const cookieeParser = require('cookie-parser');
const authRouter = require("./routes/auth.route");
const loginRouter = require('./routes/login.route');
const musicRouter = require('./routes/music.route')

const app = express();

app.use(express.json());
app.use(cookieeParser());

// creating a base URL 
app.use('/api/auth', authRouter);
app.use('/api/auth',loginRouter)
app.use('/api/music/',musicRouter);


module.exports = app;
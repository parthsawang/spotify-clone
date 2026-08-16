const express = require('express');
const cookieeParser = require('cookie-parser');
const authRouter = require("./routes/auth.route");;



const app = express();

app.use(express.json());
app.use(cookieeParser());

app.use('/api/auth', authRouter);


module.exports = app;
const express = require('express');
const cookieeParser = require('cookie-parser');
const authRouter = require("./routes/auth.route");
const loginRouter = require('./routes/login.route');



const app = express();

app.use(express.json());
app.use(cookieeParser());

app.use('/api/auth', authRouter);
app.use('api/auth/',loginRouter)


module.exports = app;
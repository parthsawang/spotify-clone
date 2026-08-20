const express = require('express');
const loginController = require('../controller/login.controller')

const  loginRouter = express.Router();


loginRouter.post('/login',loginController.loginUser);


module.exports = loginRouter;
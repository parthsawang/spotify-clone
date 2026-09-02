const express = require('express');
const loginController = require('../controller/login.controller')
const {logoutUser} = require('../controller/login.controller')
const  loginRouter = express.Router();


loginRouter.post('/login',loginController.loginUser);
loginRouter.post('/logout',logoutUser);


module.exports = loginRouter;
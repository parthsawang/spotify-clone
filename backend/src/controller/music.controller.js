const express = require('express');
const musicModel = require('../models/music.model');
const {uploadFile} = require('../services/storage.service')
const jwt = require("jsonwebtoken")


async function createMusic(req , res) {
    
    const {uri, title , artist } = req.body
     

const token = req.cookies.token;



if(!token) {
    return res.status(401).json({
        message:" unauthorized user",
    })
}

try {
    
  const decoded= await jwt.verify(token.process.env.JWT_SECRET)
         
  if(decoded !== artist) {
    
    return res.status(403).json({
        message: "You dont have acess to create an music"
    })
  }



} catch (error) {

    return res.status(401).json({
        message: "Unauthorized"
    })

     const {title} = req.body;
     const file = req.file;


}

}
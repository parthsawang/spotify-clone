const userModel =  require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dontenv = require('dotenv')
dontenv.config()
async function registerUser(req,res) {
    const { userName , email , password ,role } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            {userName},
            {email}
        ]
    });

    if (isUserAlreadyExist){
            return res.status(409).json({message: 'User already exists'});

            const user =  await usermodel.create({
                username,
                email,
                password,
                role

            })
    }
};

const token = jwt.sign({
    id: user._id,
    role: user.role
},process.env.JWT_SECRET)


res.cookie("token",token)

res.status(201).json({
    message: "user is succesfully segistered",
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }
})


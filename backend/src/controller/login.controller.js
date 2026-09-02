
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function loginUser(req, res) {

    const { username, email, password } = req.body;

    // Check if user exists with username OR email
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    // If user doesn't exist
    if (!isUserAlreadyExist) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
        password,
        isUserAlreadyExist.password
    );

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: isUserAlreadyExist._id,
            role: isUserAlreadyExist.role
        },
        process.env.JWT_SECRET
    );

    // Store token in cookie
    res.cookie("token", token);


    // Send response
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: isUserAlreadyExist._id,
            username: isUserAlreadyExist.username,
            email: isUserAlreadyExist.email,
            role: isUserAlreadyExist.role
        }
    });
}

async function logoutUser(req, res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = {loginUser , logoutUser};


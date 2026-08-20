const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {

    // Get user data from request body
    const { username, email, password, role = "user"} = req.body;

    // Check if a user already exists with the same username OR email
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    // If user already exists, stop execution and send an error response
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }

    // Hash the plain-text password before storing it in the database
    const hash = await bcrypt.hash(password, 10);

    // Create the new user in MongoDB
  

    const user = await userModel.create({
        
        username,
        email,
        password: hash ,
        role
    });

    console.log("USER CREATED:", user);
console.log("DATABASE:", userModel.db.name);
console.log("COLLECTION:", userModel.collection.name);

    // Create JWT token using the user's ID and role
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    console.log(token)

    // Store JWT token in a cookie
    res.cookie("token", token);
    

    // Send successful registration response
    return res.status(201).json({
        message: "User is successfully registered",

        // Don't send the password back to the client
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}




module.exports = { registerUser };


// IMPORTANT:
// We export the controller as an object because a controller file
// can contain multiple controller functions.
// Then we can import the required controller functions in our routes.

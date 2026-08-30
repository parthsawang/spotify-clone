const jwt = require("jsonwebtoken")

async function authArtist (req , res , next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })

    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded!== "artist"){
             return res.status(403).json({
                message: "You don't have access to create music album"
            });
        };


        next()


    } catch (error) {
        console.error(error);

        return res.status(402).json({
            message: "Unauthorized User"
        });
    }
   
}

module.exports = authArtist;
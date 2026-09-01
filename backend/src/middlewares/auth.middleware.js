
const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED ROLE:", decoded.role);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access to create music or albums"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        console.error("JWT verification failed:", error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authArtist;


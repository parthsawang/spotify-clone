const { ImageKit } = require("@imagekit/nodejs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    try {
        const result = await client.files.upload({
            file: file,
            fileName: `music_${Date.now()}.mp3`,
            folder: "yt-complete-backend/music",
        });

        return result;
    } catch (error) {
        console.error("ImageKit upload error:", error);
        throw error;
    }
}

module.exports = uploadFile;
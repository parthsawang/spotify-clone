const {ImageKit} = require('@imagekit/nodejs')

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file){

    const result = await client.files.upload({
        file,
        fileName: 'music_' + DataTransfer.now(),
        folder: 'yt-complete-backend/music'
        
    })

    return result;

}

module.exports = uploadFile;
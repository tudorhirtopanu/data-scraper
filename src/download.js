const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

//TODO: Specify the path of download
async function downloadImage(url, num){
    // URL of the image you want to download
    const imageUrl = url;

    // Path where you want to save the downloaded image
    const desktopPath = path.join(os.homedir(), 'Documents');
    // Path where you want to save the downloaded image on desktop
    const imagePath = path.join(desktopPath, 'downloaded_image'+num+'.jpg');

    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'stream'
        });
        // Pipe the image data directly to a file
        response.data.pipe(fs.createWriteStream(imagePath));
        console.log('Image downloaded successfully.');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwIjZf0DSKb1hq3ZKcamyGTeWag6AWsNs5bg&usqp=CAU';

//downloadImage(imageUrl, 200);

module.exports = downloadImage;


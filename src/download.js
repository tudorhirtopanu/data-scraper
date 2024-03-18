const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function downloadImage(url, imageName, outputPath){

    // URL of the image you want to download
    const imageUrl = url;

    // Path where you want to save the downloaded image
    //const dirPath = path.join(os.homedir(), 'Documents/HVDD-RAW');

    // Path to save the downloaded image
    const imagePath = path.join(outputPath, imageName+'.jpg');

    try {
        const response = await axios({
            url: imageUrl,
            responseType: 'stream'
        });
        // Pipe the image data directly to a file
        response.data.pipe(fs.createWriteStream(imagePath));
        //console.log('Image downloaded successfully.');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwIjZf0DSKb1hq3ZKcamyGTeWag6AWsNs5bg&usqp=CAU';
const outputPath = "/Users/tudor/Documents/HVDD-RAW"
//downloadImage(imageUrl, "testImage2", outputPath);

module.exports = downloadImage;


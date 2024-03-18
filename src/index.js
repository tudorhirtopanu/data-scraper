
const puppeteer = require('puppeteer')
const fs = require('fs');
const downloadImage = require('./download');

async function run(query){

    // launch a browser instance
    const browser = await puppeteer.launch({
       headless:false // make browser visible
    });

    // create a new page in the browser
    const page = await browser.newPage()

    // set the viewport size of the browser
    await page.setViewport({ width: 1366, height: 768 });

    // navigate to Google Images homepage
    await page.goto('https://www.google.com/imghp')

    // Check for and click on the reject button if it exists
    const rejectButton = await page.$('#W0wltc > div')
    if(rejectButton) {
        await rejectButton.click();
    }

    // Find the search field and type the query into it
    const searchField = await page.$('#APjFqb')
    if(searchField){
        await searchField.click();
        await searchField.type(query);
    }

    // Simulate pressing the Enter key to trigger the search
    await page.keyboard.press('Enter');

    await page.waitForSelector('.rg_i');

    previousPageHeight = 0;

    // Loop to scroll down to load images ///////////////////
    for (let i = 0; i < 2; i++) {
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await new Promise(r => setTimeout(r, 2000));

        // Check if the 
        const isClickable = await page.$eval('#islmp > div > div > div > div.tmS4cc.snjnxc.blLOvc > div.C5Hr4 > div.K414Oe > div.FAGjZe > input', element => {
            // Check if the element is clickable
            const style = window.getComputedStyle(element);
            return (element.offsetHeight > 0 && element.offsetWidth > 0 && style.visibility !== 'hidden' && style.display !== 'none');
        });
        
        if (isClickable) {
            // The element is clickable
            console.log("Element is clickable");
            // Now you can proceed with clicking it
            await page.click('#islmp > div > div > div > div.tmS4cc.snjnxc.blLOvc > div.C5Hr4 > div.K414Oe > div.FAGjZe > input');
        } else {
            // The element is not clickable
            console.log("Element is not clickable");
        }

        // Check if the end has been reached
        const pageHeight = await page.evaluate(() => {
            return document.body.scrollHeight;
        });
        
        console.log("Height of the full page:", pageHeight);
        if(previousPageHeight == pageHeight){
            console.log("END REACHED");
            break;
        }
        previousPageHeight = pageHeight;
  
      }
  
    var count = 0;

    // Fetch the src of each image //////////////////////
    const imageContainer = await page.$('#islmp');
    if (imageContainer) {
        const images = await imageContainer.$$('.rg_i'); // Select all the images within the container

        for (let i = 0; i < images.length; i++) {
            await images[i].click(); 

            // Get the src attribute of the clicked image
        const src = await page.evaluate(image => {
            return image.getAttribute('src');
        }, images[i]);

        console.log("Image src:", src);

        // TODO: save image with query name?
        await downloadImage(src, i);
        count++;

        }
    } else {
        console.log('Image container not found');
    }

    console.log("Finished with ", count," images iterated")
}

run('cars');
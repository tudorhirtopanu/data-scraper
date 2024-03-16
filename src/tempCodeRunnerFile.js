const elementVisible = await page.waitForSelector('input.LZ4I[jsaction="Pmjnye"][type="button"][value="Show more results"]', { timeout: 3000 }).then(() => true).catch(() => false);

        if (elementVisible) {
            console.log("FOUND");
        }
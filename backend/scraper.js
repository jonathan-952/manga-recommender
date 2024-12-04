const MangaScraper = require('./handlers/webdriver.js');

async function scraper() {
    const bot = new MangaScraper('https://myanimelist.net/manga.php');
    await bot.initialize();

    await bot.clickElement('a[href = "https://myanimelist.net/manga.php?letter=."]', 10000); // click a-z sort

    // instead of back arrowing every time, you can open a new window and close it to avoid stale element error
    const elements = await bot.selectElements('a.hoverinfo_trigger.fw-b');
    for (let i = 0; i < 5; i++) {
        try {
        const href = await bot.getHref(elements[i]);
  
        await bot.navigate(href)
        // await bot.scrollAndClick(element, 2000) // click on manga title
   
        const data = await bot.getTexts('.leftside', 2000);
        console.log(data);

        const description = await bot.getText('[itemprop = "description"]', 2000);
        console.log(description);

        await bot.prevPage();

        } catch (err) {
            console.log(err);
        }
    }
       

    await bot.quit();
}

scraper();

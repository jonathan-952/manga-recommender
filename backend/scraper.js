const MangaScraper = require('./handlers/webdriver.js');

async function scraper() {
    const bot = new MangaScraper('https://myanimelist.net/manga.php');
    await bot.initialize();

    await bot.clickElement('a[href = "https://myanimelist.net/manga.php?letter=."]', 10000); // click a-z sort
    let window_url;
    for (let i = 0; i < ; i++) {
        try {
        const elements = await bot.selectElements('a.hoverinfo_trigger.fw-b');
        const href = await bot.getHref(elements[i]);
        window_url = href;
        await bot.navigate(href)
        // await bot.scrollAndClick(element, 2000) // click on manga title
   
        const data = await bot.getTexts('.leftside', 2000);
        console.log(data);

        const description = await bot.getText('[itemprop = "description"]', 2000);
        console.log(description);

        await bot.prevPage();
        } catch (err) {
            console.log(err);
            if (bot.driver.getWindowHandle() != window_url) {
                await bot.prevPage();
            }
        }
    }
       

    await bot.quit();
}

scraper();

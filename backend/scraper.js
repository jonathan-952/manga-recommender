const {By, Builder, Browser, until} = require('selenium-webdriver');
const MangaScraper = require('./handlers/webdriver.js');

async function scraper() {
    const bot = new MangaScraper('https://myanimelist.net/manga.php');
    await bot.initialize();
  
    await bot.clickElement('a[href = "https://myanimelist.net/manga.php?letter=."]', 10000); // click a-z sort
    console.log('passed')
    await bot.scrollAndClick('a[href = "https://myanimelist.net/manga/131635/-50kg_no_Cinderella"]', 2000) // click on manga title

    const data = await bot.getTexts('.leftside', 2000);
    console.log(data);
    // const description = await driver.findElements(By.css('[itemprop = "description"]'));
 
    await bot.quit();
}

scraper();

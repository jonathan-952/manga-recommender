const {By, Builder, Browser, until} = require('selenium-webdriver');

class MangaScraper {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.driver = null;
    }

    async initialize() {
        this.driver = await new Builder().forBrowser(Browser.CHROME).build();
        await this.driver.get(this.baseURL);
    }

    async clickElement(selector, time) {
        await this.driver.wait(until.elementLocated(By.css(selector)), time);
        const element = await this.driver.findElement(By.css(selector));
        await element.click();
        await this.driver.sleep(time);
    }

    async scrollAndClick(selector, time) {
        const element = await this.driver.findElement(By.css(selector));
        await this.driver.executeScript("arguments[0].scrollIntoView();", element);
        // await this.driver.wait(until.elementIsVisible(By.css(selector)), time);
        await element.click();
        await this.driver.sleep(time);
    }

    async getText(selector, time) {
        const element = await this.driver.findElement(By.css(selector));
        const text = await element.getText();
        await this.driver.sleep(time);
        return text;
    }

    async quit() {
        this.driver.quit();
    }

    async getTexts(selector, time) {
        const element = await this.driver.findElements(By.css(selector));

        let data = [];
        for (let div of element) {
        const text = await div.getText();
        data.push(text);
        await this.driver.sleep(time);
        }
        return data;
    }

    async prevPage() {
        await this.driver.navigate().back();
    }

    // async switchWindow() {}

}

module.exports = MangaScraper;
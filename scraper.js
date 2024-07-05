const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

const scrapeData = async () => {
    let driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
    
    try {
        await driver.get('https://www.nvidia.com/en-in/geforce/buy/');
        
        await driver.wait(until.elementLocated(By.css('.buy-container')), 10000);
        
        let gpuElements = await driver.findElements(By.css('.buy-item'));
        let gpuData = [];

        for (let element of gpuElements) {
            let name = await element.findElement(By.css('.product-title')).getText();
            let priceElement = await element.findElements(By.css('.price .price-value'));
            let price = priceElement.length > 0 ? await priceElement[0].getText() : 'N/A';

            gpuData.push({ name, price });
        }
        
        return gpuData;
    } finally {
        await driver.quit();
    }
};

module.exports = scrapeData;

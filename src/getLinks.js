const puppeteer = require('puppeteer');

let getLinks = async (baseDomain, url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);
    await page.waitForSelector('#WIX_ADS');
    const result = await page.evaluate((baseDomain, url) => {
        let data = {};
        let elements = document.querySelectorAll('a'); // Select all links

        for (const element of elements) {
            const href = element.href.trim().split('?')[0].split('#')[0];
            if (!href.length) continue;
            if (href === url) continue;

            if (!data[href]) {
                data[href] = {
                    url: href,
                    internal: href.indexOf(baseDomain) > -1
                };
            }
        }
        return data;
    }, baseDomain, url);

    browser.close();
    return result;
};

module.exports = getLinks;

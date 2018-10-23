const puppeteer = require('puppeteer');

const getLinks = async (baseOrigin, url) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(pageScript, baseOrigin, url);

    await browser.close();

    return result;
};

const pageScript = (baseOrigin, url) => (
    // Select all links
    Array.from(document.querySelectorAll('a'))
        // Filter empty links
        .filter(a => a.href.length > 0)
        // Map to object array
        .map((a) => {
            const linkUrl = new URL(a.href);
            return { url: linkUrl.origin + linkUrl.pathname, internal: linkUrl.origin === baseOrigin }
        })
        // Filter current url
        .filter(item => item.url !== url)
        // Filter non http links
        .filter(item => item.url.indexOf('http') > -1)
        // Reduce to single object
        .reduce((acc, curr) => {
            acc[curr.url] = curr;
            return acc;
        }, {})
);


module.exports = getLinks;

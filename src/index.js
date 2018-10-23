const getLinks = require('./getLinks');

const baseOrigin = 'https://bigbraintest.wixsite.com';
const url = 'https://bigbraintest.wixsite.com/site';
const depth = 4;

// Initialize allLinks
const allLinks = {
    [url]: { url, internal: true }
};

const scrape = (baseOrigin, position, depth) => {

    if (depth === 0 || !position.internal) {
        delete position.url;
        delete position.internal;
        return Promise.resolve();
    }

    // Update depth
    depth--;

    console.log(`${position.url} ${depth}`);

    return getLinks(baseOrigin, position.url)
        .then((links) => {
            // Clear position object
            delete position.url;
            delete position.internal;

            // Assign links to current position object
            Object.assign(position, links);

            // Recursively run scrape function on all the links
            return Promise.all(Object.keys(position).map(key => scrape(baseOrigin, position[key], depth)));
        });

};

scrape(baseOrigin, allLinks[url], depth).then(() => {
    console.log(JSON.stringify(allLinks, null, "  "));
});
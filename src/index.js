const baseDomain = 'bigbraintest.wixsite.com';
const url = 'https://bigbraintest.wixsite.com/site';
const getLinks = require('./getLinks');
const depth = 3;
const allLinks = {};


//todo -
// run over url, find all links
// for each link - find if it's internal (use 'baseDomain'), and save this parameter
// if external - save it to 'allLinks' obj
// if internal - run the same function on this url as well
// and so on - until you reach to the 'depth' parameter level

// this code works for one URL:
getLinks(baseDomain, url)
    .then(data => {
        console.log(data);
    });

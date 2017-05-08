const PouchDB = require('pouchdb');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let db = new PouchDB('elm');

// db.info().then( (info) => console.log(info));


/*
  the plan:
  1. get list of articles on the Elm home page
  2. create sorted array of every article id
  3. store the array in a database

*/

// via http://www.netinstructions.com/simple-web-scraping-with-node-js-and-javascript/
request("http://elm.umaryland.edu/", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  const $ = cheerio.load(body);

  let articleIds = [];
  let elmIds = { "_id": "elmIds" };

  $('#mpcth_page_articles > article').each(function(index) {
    articleIds.push($(this).attr('id'));
    console.log('articleIds', articleIds);
  });

  console.log('articleIds.legnth', articleIds.length);
  console.log('articleIds', articleIds);
  // fs.appendFileSync('elm.html', body);

  elmIds.ids = articleIds;

  console.log('elmIds', elmIds);

  db.put(elmIds);
});

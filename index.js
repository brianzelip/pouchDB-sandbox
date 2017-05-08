const PouchDB = require('pouchdb');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

let db = new PouchDB('kittens');

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

  $('#mpcth_page_articles > article').each(function(index) {
    articleIds.push($(this).attr('id'));
    console.log('articleIds', articleIds);
  });

  console.log('articleIds.legnth', articleIds.length);

  // console.log('typeof(body)', typeof(body));
  // console.log('typeof($)', typeof($));
  // console.log('typeof(articleIds)', typeof(articleIds));
  // console.log('articleIds', articleIds);
  // fs.appendFileSync('articles.js', articles);

  // let articleIds = articles.map( (article) => console.log(this) );

  // console.log('body', body);

  // fs.appendFileSync('elm.html', body);

  // $('div#siteTable > div.link').each(function( index ) {
  //   var title = $(this).find('p.title > a.title').text().trim();
  //   var score = $(this).find('div.score.unvoted').text().trim();
  //   var user = $(this).find('a.author').text().trim();
  //   console.log("Title: " + title);
  //   console.log("Score: " + score);
  //   console.log("User: " + user);
  //   fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
  // });

});

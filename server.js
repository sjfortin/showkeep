const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const request = require("request");

const API_KEY = process.env.SETLIST_FM_API_KEY;

// GET Search Results from server
app.get('/shows', function (req, res) {
    // https://api.setlist.fm/rest/1.0/search/setlists?artistName=' + req.query.artist + '&cityName=' + req.query.city + '&p=' + req.query.currentPageNumber

    // let baseUrl = 'https://api.setlist.fm/rest/1.0/search/setlists?';
    // if (req.query.artist) {
    //   baseUrl += 'artistName=' + req.query.artist;
    // }
    // if (req.query.city) {
    //   baseUrl += '&cityName=' + req.query.city;
    // }
    // if (req.query.venue) {
    //   baseUrl += '&venueName=' + req.query.venue;
    // }
    // baseUrl += '&p=' + req.query.currentPageNumber;

    // console.log('baseUrl', baseUrl);

    request(
      {
        url: "https://api.setlist.fm/rest/1.0/search/setlists?artistName=kamasi&p=1",
        headers: {
          Accept: "application/json",
          "x-api-key": API_KEY,
          "User-Agent": "request"
        }
      },
      function(error, response, body) {
        if (response && response.statusCode == 200) {
          console.log(body)
          res.send(body);
        } else {
          console.log("error", error);
          res.sendStatus(204);
        }
      }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

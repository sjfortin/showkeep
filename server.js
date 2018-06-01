const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const request = require("request");

const API_KEY = process.env.SETLIST_FM_API_KEY;

// GET Search Results from server
app.get('/shows', function (req, res) {
    // https://api.setlist.fm/rest/1.0/search/setlists?artistName=' + req.query.artist + '&cityName=' + req.query.city + '&p=' + req.query.currentPageNumber
    console.log('req', req.query)
    let baseUrl = 'https://api.setlist.fm/rest/1.0/search/setlists?';
    if (req.query.artist) {
      baseUrl += "artistName=" + req.query.artist + "&p=1";
    } else {
      baseUrl += "artistName=kamasi&p=1";
    }

    console.log('baseUrl', baseUrl);

    request(
      {
        url: baseUrl,
        headers: {
          Accept: "application/json",
          "x-api-key": API_KEY,
          "User-Agent": "request"
        }
      },
      function(error, response, body) {
        if (response && response.statusCode == 200) {
          res.send(body);
        } else {
          console.log("error", error);
          res.sendStatus(204);
        }
      }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));

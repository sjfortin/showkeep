require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./modules/pool');

const request = require('request');

const SETLIST_FM_API_KEY = process.env.SETLIST_FM_API_KEY;
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET Search Results from server
app.get('/shows', function(req, res) {
  // https://api.setlist.fm/rest/1.0/search/setlists?artistName=' + req.query.artist + '&cityName=' + req.query.city + '&p=' + req.query.currentPageNumber
  let baseUrl = 'https://api.setlist.fm/rest/1.0/search/setlists?';
  if (req.query.artist) {
    baseUrl += 'artistName=' + req.query.artist;
  }

  request(
    {
      url: baseUrl,
      headers: {
        Accept: 'application/json',
        'x-api-key': SETLIST_FM_API_KEY,
        'User-Agent': 'request'
      }
    },
    function(error, response, body) {
      if (response && response.statusCode == 200) {
        res.send(body);
      } else {
        console.log('error', error);
        res.sendStatus(204);
      }
    }
  );
});

app.get('/image', function(req, res) {
  console.log(req.query);
  request(
    {
      url:
        'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=' +
        req.query.mbid +
        '&api_key=' +
        LAST_FM_API_KEY +
        '&format=json',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'request'
      }
    },
    function(error, response, body) {
      if (response && response.statusCode == 200) {
        res.send(body);
      } else {
        console.log('error', error);
        res.sendStatus(204);
      }
    }
  );
});

// POST manual shows to users_shows table
app.post('/addShowManually', function(req, res) {
  console.log(req.body);
  pool.connect(function(errDatabase, client, done) {
    if (errDatabase) {
      console.log('Error connecting to database', errDatabase);
      res.sendStatus(500);
    } else {
      client.query(
        'INSERT INTO testshows (artist, venue, city, image) VALUES ($1, $2, $3, $4);',
        [
          req.body.show.artist.name,
          req.body.show.venue.name,
          req.body.show.venue.city.name,
          req.body.image
        ],
        function(errQuery, data) {
          done();
          if (errQuery) {
            console.log('Error making database query', errQuery);
            res.sendStatus(500);
          } else {
            res.send(data.rows);
            // res.sendStatus(200);
          }
        }
      );
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

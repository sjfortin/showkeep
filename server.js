require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const request = require('request');

const API_KEY = process.env.SETLIST_FM_API_KEY;

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
        'x-api-key': API_KEY,
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

// Add a show to database
app.post('/addShowManually', function(req, res) {
  console.log(req.body);
  res.status(200).send(req.body);
  // pool.connect(function(errDatabase, client, done) {
  //   if (errDatabase) {
  //     console.log('Error connecting to database', errDatabase);
  //     res.sendStatus(500);
  //   } else {
  //     client.query(
  //       'INSERT INTO users_shows (artist, show_date, full_year, venue, city, state, image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning id;',
  //       [
  //         req.body.newShow.artist,
  //         req.body.newShow.show_date,
  //         req.body.full_year,
  //         req.body.newShow.venue,
  //         req.body.newShow.city,
  //         req.body.newShow.state,
  //         req.body.newShow.newImage,
  //         userID
  //       ],
  //       function(errQuery, data) {
  //         done();
  //         if (errQuery) {
  //           console.log('Error making database query', errQuery);
  //           res.sendStatus(500);
  //         } else {
  //           res.send(data.rows);
  //         }
  //       }
  //     );
  //   }
  // });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function addShow(show, image) {
  axios
    .post('/addShowManually', {
      show: show,
      image: image
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

const ShowSearchList = props => {
  return (
    <div
      style={{
        margin: 'auto 10px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }}
    >
      {props.shows.setlist.map(show => (
        // <Show key={show.id} showDetails={show} image={props.image} />
        <div
          key={show.id}
          style={{
            flexBasis: '30%',
            padding: '5px 10px',
            marginBottom: '20px',
            borderRadius: '4px',
            backgroundColor: '#e5e5e5',
            boxShadow:
              '0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)'
          }}
        >
          <p>Artist: {show.artist.name}</p>
          <p>Date: {show.eventDate}</p>
          <p>Venue: {show.venue.name}</p>
          <p>City: {show.venue.city.name}</p>
          <button
            onClick={() => {
              addShow(show, props.image);
            }}
          >
            Add show
          </button>
          <Link
            to={{
              pathname: `show/${show.id}`,
              state: {
                show: show,
                image: props.image
              }
            }}
          >
            See details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShowSearchList;

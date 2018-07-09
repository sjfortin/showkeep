import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Show = props => {
  return (
    <div>
      <Link
        to={{
          pathname: '/search'
        }}
      >
        Go Back
      </Link>
      <div>
        <img
          src={props.location.state.image}
          alt={props.location.state.image}
        />
      </div>
      <p>Artist: {props.location.state.show.artist.name}</p>
      <p>Date: {props.location.state.show.eventDate}</p>
      <p>Venue: {props.location.state.show.venue.name}</p>
      <p>City: {props.location.state.show.venue.city.name}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
  shows: state.currentShows
});

export default connect(mapStateToProps)(Show);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Show extends Component {
  render() {
    const { name } = this.props.location.state.show.artist;
    return (
      <div>
        <Link to="/search">Go Back</Link>
        <div>
          <img
            src={this.props.location.state.image}
            alt={this.props.location.state.image}
          />
        </div>
        <p>Artist: {this.props.location.state.show.artist.name}</p>
        <p>Date: {this.props.location.state.show.eventDate}</p>
        <p>Venue: {this.props.location.state.show.venue.name}</p>
        <p>City: {this.props.location.state.show.venue.city.name}</p>
      </div>
    );
  }
}

export default Show;

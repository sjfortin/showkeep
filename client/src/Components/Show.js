import React, { Component } from "react";

class ShowSearch extends Component {

  render() {
    return <div style={{ flexBasis: '30%', padding: '5px 10px', marginBottom: '20px', borderRadius: '4px', boxShadow: '0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)'}}>
        <p>Artist: {this.props.showDetails.artist.name}</p>
        <p>Date: {this.props.showDetails.eventDate}</p>
        <p>Venue: {this.props.showDetails.venue.name}</p>
        <p>City: {this.props.showDetails.venue.city.name}</p>
      </div>;
  }
}

export default ShowSearch;
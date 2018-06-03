import React, { Component } from 'react';
import axios from 'axios';

class ShowSearch extends Component {
  constructor(props) {
    super(props);
    this.addShow = this.addShow.bind(this);
  }

  addShow() {
    axios
      .post('/addShowManually', {
        artist: this.props.showDetails.artist.name,
        date: this.props.showDetails.eventDate,
        venue: this.props.showDetails.venue.name
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          flexBasis: '30%',
          padding: '5px 10px',
          marginBottom: '20px',
          borderRadius: '4px',
          boxShadow:
            '0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)'
        }}
      >
        <p>Artist: {this.props.showDetails.artist.name}</p>
        <p>Date: {this.props.showDetails.eventDate}</p>
        <p>Venue: {this.props.showDetails.venue.name}</p>
        <p>City: {this.props.showDetails.venue.city.name}</p>
        <button onClick={this.addShow}>Add show</button>
      </div>
    );
  }
}

export default ShowSearch;

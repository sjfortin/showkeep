import React, { Component } from "react";
import axios from "axios";

class ShowSearchList extends Component {
  constructor(props) {
    super(props);
    this.addShow = this.addShow.bind(this);
  }

  addShow(show) {
    console.log(show);
    axios
      .post("/addShowManually", { artist: show })
      .then(function(response) {
        console.log('test',response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{
          margin: "auto 10px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {this.props.shows.setlist.map(show => (
          // <Show key={show.id} showDetails={show} image={this.props.image} />
          <div
            key={show.id}
            style={{
              flexBasis: "30%",
              padding: "5px 10px",
              marginBottom: "20px",
              borderRadius: "4px",
              backgroundColor: "#e5e5e5",
              boxShadow:
                "0 15px 35px rgba(50, 50, 93, .1), 0 5px 15px rgba(0, 0, 0, .07)"
            }}
          >
            {/* <img src={this.props.image} alt={this.props.image} /> */}
            <p>Artist: {show.artist.name}</p>
            <p>Date: {show.eventDate}</p>
            <p>Venue: {show.venue.name}</p>
            <p>City: {show.venue.city.name}</p>
            <button onClick={() => { this.addShow(show) }}>Add show</button>
          </div>
        ))}
      </div>
    );
  }
}
export default ShowSearchList;

import React, { Component } from "react";
import Show from "./Show";

class ShowSearchList extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            margin: "auto 10px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          {this.props.shows.map(show => (
            <Show key={show.id} showDetails={show} image={this.props.image} />
          ))}
        </div>
      </div>
    );
  }
}
export default ShowSearchList;

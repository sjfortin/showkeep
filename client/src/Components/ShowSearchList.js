import React, { Component } from "react";
import Show from "./Show";

class ShowSearchList extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            maxWidth: "800px",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          {this.props.shows.map(show => (
            <Show key={show.id} showDetails={show} />
          ))}
        </div>
      </div>
    );
  }
}
export default ShowSearchList;

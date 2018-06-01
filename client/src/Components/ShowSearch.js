import React, { Component } from "react";
import Show from "./Show";

class ShowSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      term: "Radiohead"
    };
  }

  componentDidMount() {
    fetch(`/shows?artist=${this.state.term}`)
      .then(res => res.json())
      .then(
        res => {
          this.setState({ isLoaded: true, response: res.setlist });
          console.log(this.state.response);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .catch(err => console.log(err));
  }

  render() {
    const { error, isLoaded, response } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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
            {response.map(show => (
              <Show key={show.id} showDetails={show} />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default ShowSearch;

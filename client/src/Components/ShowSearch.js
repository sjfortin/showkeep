import React, { Component } from "react";

const API_KEY = process.env.REACT_APP_SETLIST_FM_API_KEY;

class ShowSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
  }

  render() {
    return <div>I am ShowSearch</div>;
  }
}

export default ShowSearch;

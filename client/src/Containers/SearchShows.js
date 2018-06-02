import React, { Component } from 'react';
import ShowSearchList from '../Components/ShowSearchList';

class SearchShows extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, response: [], showSearchedFor: 'Wilco', somethingHasBeenSearchedFor: '' };
  }

  componentDidMount() {
    if (this.state.showSearchedFor) {
      fetch(`/shows?artist=${this.state.showSearchedFor}`)
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
    } else {
      this.setState({
        somethingHasBeenSearchedFor: 'not yet',
        isLoaded: true
      });
    }
  }

  render() {
    const { error, isLoaded, response, somethingHasBeenSearchedFor } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (somethingHasBeenSearchedFor === 'not yet') {
      return <div>Search, or else!</div>
    } else {
      return <ShowSearchList shows={response} />;
    }
  }
}

export default SearchShows;

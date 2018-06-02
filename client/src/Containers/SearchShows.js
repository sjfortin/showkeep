import React, { Component } from 'react';
import ShowSearchList from '../Components/ShowSearchList';

class SearchShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      searchTerm: ''
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  setSearchTerm(event) {
    this.setState({ searchTerm: event.target.value });
  }

  submitSearch(event) {
    event.preventDefault();
    if (this.state.searchTerm === '') {
      this.setState({
        response: [],
        isLoaded: false
      });
    } else {
      this.getShows();
    }
  }

  getShows = () => {
    return fetch(`/shows?artist=${this.state.searchTerm}`)
      .then(res => res.json())
      .then(
        res => {
          this.setState({ isLoaded: true, response: res.setlist });
        },
        error => {
          this.setState({ isLoaded: true, error });
        }
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <label>
            Search for a show:
            <input value={this.state.searchTerm} onChange={this.setSearchTerm} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!this.state.isLoaded ? (
          <div>Use that search box to do some searching</div>
        ) : (
          <ShowSearchList shows={this.state.response} />
        )}
      </div>
    );
  }
}

export default SearchShows;

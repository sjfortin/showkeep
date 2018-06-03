import React, { Component } from 'react';
import ShowSearchList from '../Components/ShowSearchList';
import axios from 'axios';

class SearchShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      searchTerm: '',
      noResults: '',
      artistImage: ''
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getShows = this.getShows.bind(this);
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
    return axios
      .get(`/shows?artist=${this.state.searchTerm}`)
      .then(
        res => {
          if (res.status === 204) {
            this.setState({ isLoaded: true, response: [], noResults: true });
          } else {
            this.setState({
              isLoaded: true,
              response: res.data.setlist,
              noResults: false
            });
          }
        },
        error => {
          this.setState({ isLoaded: true, error });
        }
      )
      .then(() => {
        if (!this.state.noResults) {
          this.getImage();
        }
      })
      .catch(err => console.log(err));
  };

  getImage = () => {
    return axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${
          this.state.response[0].artist.name
        }&api_key=17fc707735a64230fe40a6576b115c6a&format=json`
      )
      .then(res => {
        console.log('getting the artist iamge', res);
        this.setState({
          artistImage: res.data.artist.image[2]['#text']
        });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <label>
            Search for a show:
            <input
              value={this.state.searchTerm}
              onChange={this.setSearchTerm}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {!this.state.isLoaded ? (
          <div>Use that search box to do some searching</div>
        ) : this.state.noResults ? (
          <div>No results</div>
        ) : (
          <ShowSearchList
            shows={this.state.response}
            image={this.state.artistImage}
          />
        )}
      </div>
    );
  }
}

export default SearchShows;

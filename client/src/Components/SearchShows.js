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
            console.log(res.data);
            this.setState({
              isLoaded: true,
              response: res.data,
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
      .get(`/image?mbid=${this.state.response.setlist[0].artist.mbid}`)
      .then(res => {
        console.log('image res', res);
        if (res.data.artist) {
          this.setState({
            artistImage: res.data.artist.image[2]['#text']
          });
        } else {
          this.setState({
            artistImage:
              'http://blog.iso50.com/wp-content/uploads/2016/10/1106-450x450.jpg'
          });
        }
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
          <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h1>Search Results:</h1>
              <h3>
                {this.state.response.page} out of {this.state.response.total}{' '}
                pages
              </h3>
              <ShowSearchList
                shows={this.state.response}
                image={this.state.artistImage}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchShows;

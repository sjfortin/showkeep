import React, { Component } from 'react';
import ShowSearchList from '../Components/ShowSearchList';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { setSearchTerm, setCurrentShowList } from '../actionCreators';

class SearchShows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      noResults: false,
      searchTerm: '',
      response: [],
      artistImage: '',
      artistImageSmall: '',
      pageCount: '',
      currentPageNumber: 1
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getShows = this.getShows.bind(this);
  }

  handleSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  submitSearch(event) {
    event.preventDefault();
    if (this.state.searchTerm === '') {
      this.setState({
        noResults: true
      });
    } else {
      this.getShows();
      this.props.setSearchTerm(this.state.searchTerm);
    }
  }

  getShows = () => {
    return axios
      .get(
        `/shows?artist=${this.state.searchTerm}&currentPageNumber=${
          this.state.currentPageNumber
        }`
      )
      .then(
        res => {
          if (res.status === 204) {
            this.setState({ noResults: true });
          } else {
            console.log(res.data);
            this.setState({
              response: res.data,
              pageCount: Math.ceil(res.data.total / 20)
            });
            this.props.setCurrentShowList(res.data);
          }
        },
        error => {
          console.log('eeererer');

          this.setState({ error });
        }
      )
      .then(() => {
        if (Object.keys(this.props.shows).length !== 0) {
          this.getImage();
        }
      })
      .catch(err => console.log(err));
  };

  getImage = () => {
    return axios
      .get(`/image?artist=${this.props.shows.setlist[0].artist.name}`)
      .then(res => {
        if (res.data.results.artistmatches.artist) {
          this.setState({
            artistImage:
              res.data.results.artistmatches.artist[0].image[4]['#text'],
            artistImageSmall:
              res.data.results.artistmatches.artist[0].image[2]['#text']
          });
        } else {
          this.setState({
            artistImage:
              'http://blog.iso50.com/wp-content//2016/10/1106-450x450.jpg'
          });
        }
      });
  };

  handlePageClick = data => {
    this.setState(
      {
        currentPageNumber: data.selected + 1
      },
      () => {
        this.getShows();
      }
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <label>
            Search for a show:
            <input
              value={this.state.searchTerm}
              onChange={this.handleSearchTermChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {Object.keys(this.props.shows).length === 0 ? (
          <div>Use that search box to do some searching</div>
        ) : this.state.noResults ? (
          <div>No results</div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <h3>Past {this.props.searchTerm} shows:</h3>
              <h6>
                Check for upcoming{' '}
                <a
                  href={`https://www.last.fm/music/${
                    this.props.searchTerm
                  }/+events`}
                  alt="{this.props.searchTerm}"
                >
                  {this.props.searchTerm}
                </a>{' '}
                shows. Note: feature coming soon in showkeep.
              </h6>
              <h3>
                {this.props.shows.page} out of{' '}
                {Math.ceil(this.props.shows.total / 20)} pages
              </h3>
              <ShowSearchList
                image={this.state.artistImage}
                imageSmall={this.state.artistImageSmall}
              />
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<span>...</span>}
                breakClassName={'break-me'}
                pageCount={this.props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.searchTerm,
  shows: state.currentShows
});

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: term => dispatch(setSearchTerm(term)),
    setCurrentShowList: shows => dispatch(setCurrentShowList(shows))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchShows);

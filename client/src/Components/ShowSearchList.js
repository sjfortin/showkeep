import React, { Component } from 'react';
import Show from './Show';

class ShowSearchList extends Component {
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h1>Search Results:</h1>
          <h3>
            {this.props.shows.page} out of {this.props.shows.total} pages
          </h3>
        </div>
        <div
          style={{
            margin: 'auto 10px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
          }}
        >
          {this.props.shows.setlist.map(show => (
            <Show key={show.id} showDetails={show} image={this.props.image} />
          ))}
        </div>
      </div>
    );
  }
}
export default ShowSearchList;

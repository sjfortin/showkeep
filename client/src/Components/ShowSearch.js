import React, { Component } from "react";
import Show from './Show'

class ShowSearch extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.searchShows()
      .then(res => {
        this.setState({ response: res.setlist });
        console.log(this.state.response)
      })
      .catch(err => console.log(err));
  }

  searchShows = async () => {
    const response = await fetch("/shows");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div style={{maxWidth: '800px', margin: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {this.state.response.map(show => <Show key={show.id} showDetails={show} />)}
      </div>
    );
  }
}

export default ShowSearch;

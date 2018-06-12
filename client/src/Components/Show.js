import React, { Component } from 'react';

class Show extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    // const { showId } = this.props.match.params;
    // console.log(showId)

    // fetch(`https://api.twitter.com/user/${handle}`)
    //   .then((user) => {
    //     this.setState(() => ({ user }))
    //   })
  }
  render() {
    return <div>{this.props.location.state.show.artist.name}</div>;
  }
}

export default Show;

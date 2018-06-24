import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';

function addShow(show, image) {
  axios
    .post('/addShowManually', {
      show: show,
      image: image
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

const Button = styled.a`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: darkslateblue;
  border: 2px solid darkslateblue;
  cursor: pointer;
  &:hover {
    background: darkslateblue;
    color: white;
  }

  ${props =>
    props.primary &&
    css`
      background: rebeccapurple;
      color: white;
    `};
`;

const ShowResult = styled.div`
  padding: 5px 10px;
  margin-bottom: 40px;
  border-radius: 4px;
  background-color: #f3f3f3;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
`;

const ShowSearchList = props => {
  return (
    <div>
      <img src={props.imageSmall} alt={props.imageSmall} />
      {props.shows.setlist.map(show => (
        <ShowResult key={show.id}>
          <h3>{show.artist.name}</h3>
          <p>
            {show.eventDate}
            <br />
            {show.venue.name}
            <br />
            {show.venue.city.name}
          </p>
          <Button
            onClick={() => {
              addShow(show, props.image);
            }}
          >
            Add show
          </Button>
          <Link
            to={{
              pathname: `show/${show.id}`,
              state: {
                shows: props.shows,
                show: show,
                image: props.image
              }
            }}
          >
            See details
          </Link>
        </ShowResult>
      ))}
    </div>
  );
};

export default ShowSearchList;

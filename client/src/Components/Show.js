import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class ShowSearch extends Component {
  constructor(props) {
    super(props);
    this.addShow = this.addShow.bind(this);
  }

  addShow() {
    axios
      .post('/addShowManually', {
        artist: this.props.showDetails
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.image}
            title={this.props.showDetails.artist.name}
          />
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              {this.props.showDetails.eventDate}
          </Typography>
            <Typography variant="headline" component="h2">
              {this.props.showDetails.artist.name}
          </Typography>
            <Typography component="p">
              {this.props.showDetails.venue.name}, {this.props.showDetails.venue.city.name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.addShow} size="small">Add show</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(ShowSearch);

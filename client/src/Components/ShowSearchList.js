import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345,
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

class ShowSearchList extends Component {
  constructor(props) {
    super(props);
    this.addShow = this.addShow.bind(this);
  }

  addShow(show) {
    console.log(show);
    axios
      .post("/addShowManually", { artist: show })
      .then(function(response) {
        console.log("test", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.shows.setlist.map(show => (
          // <Show key={show.id} showDetails={show} image={this.props.image} />
          <div>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={this.props.image}
                title={show.artist.name}
              />
              <CardContent>
                <Typography color="textSecondary">
                  {show.eventDate}
                </Typography>
                <Typography variant="headline" component="h2">
                  {show.artist.name}
                </Typography>
                <Typography component="p">
                  {show.venue.name},{" "}
                  {show.venue.city.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={this.addShow} size="small">
                  Add show
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}
export default withStyles(styles)(ShowSearchList);

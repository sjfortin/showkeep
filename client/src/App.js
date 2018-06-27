import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Home from './Components/Home';
import SearchShows from './Components/SearchShows';
import Show from './Components/Show';

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">Search shows</Link>
              </li>
            </ul>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search" component={SearchShows} />
              <Route path="/show/:id" exact component={Show} />
            </Switch>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;

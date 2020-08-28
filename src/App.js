import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './assets/style/all.scss';

import Roster from './containers/Roster';
import Group from './containers/Group';
import FullScoreboard from './containers/Scoreboard';

function App() {
  return (
    <div className="App">
      <nav className="nav-bar">
        <ul className="nav">
          <li className="nav__link">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__link">
            <Link to="/roster">Roster</Link>
          </li>
          <li className="nav__link">
            <Link to="/groups">Groups</Link>
          </li>
          <li className="nav__link">
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/scoreboard" component={FullScoreboard} />
        <Route path="/roster/" component={Roster} />
        <Route path="/group/:groupId" component={Group}/>
        <Route path="/groups/" exact component={() => <h1>Group page</h1>} />
        <Route path="/"  exact component={() => <h1>Home Page</h1> }/>
        <Route render={() => <h1>Home Page Not Found</h1>}/>
      </Switch>

      
    </div>
  );
}

export default App;

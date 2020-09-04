import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './assets/style/all.scss';

import Roster from './containers/Roster';
import Group from './components/GroupScoreboard';
import Groups from './containers/Groups';
import FullScoreboard from './containers/Scoreboard';
import Scoreboard from './components/Scoreboard';

function App() {
  const competitionId = "5f481e84691a987f93f9bfb0";
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
        <Route path="/scoreboard/" component={() => <FullScoreboard competition_id={competitionId}/>}/>
        <Route path="/roster/" component={Roster} />
        <Route path="/groups/" exact component={() => <Groups competition_id={competitionId}/>}/>
        <Route path="/group/:groupId" component={Group}/>
        <Route path="/"  exact component={() => <FullScoreboard competition_id={competitionId}/> }/>
        <Route render={() => <h1>Home Page Not Found</h1>}/>
      </Switch>

      
    </div>
  );
}

export default App;

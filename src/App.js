import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import './assets/style/all.scss';

import Roster from './containers/Roster';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/roster" component={Roster} />
        <Route path="/" component={() => <h1>Home Page</h1> }/>
        <Route render={() => <h1>Page Not Found</h1>}/>
      </Switch>
    </div>
  );
}

export default App;

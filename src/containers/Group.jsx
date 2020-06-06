import React from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';

import { groupPageData, events } from '../assets/dummy-data.json';

import Scoreboard from '../components/Scoreboard.jsx';

const Group = (props) => {
  const { groupId } = useParams();
  let { path, url } = useRouteMatch();
  const groupScores = groupPageData.filter(player => player.group_id === parseInt(groupId));

  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  const eventTitles = eventHeader.map(event => event.name.replace(/\s/, '')).join('|');

  return (
    <Switch>
      <Route path={`${url}/:event(${eventTitles})`} exact component={() => <h1>Event page Not found</h1>} />
      <Route path={url} component={() => <Scoreboard scores={groupScores} /> } />
    </Switch>
  );
}

export default Group;
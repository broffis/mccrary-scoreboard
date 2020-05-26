import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';

import { groupPageData, events } from '../assets/dummy-data.json';

import Scoreboard from '../components/Scoreboard.jsx';

const Group = (props) => {
  const { groupId } = useParams();
  const groupScores = groupPageData.filter(player => player.group_id === parseInt(groupId));

  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  const eventTitles = eventHeader.map(event => event.name.replace(/\s/, '')).join('|');
  console.log('eventTitles', eventTitles);

  return (
    <Switch>
      <Route path="/group/:groupId/scoreboard" component={() => <Scoreboard scores={groupScores} />} />
      <Route path={`/group/:groupId/:event(${eventTitles})`} component={() => <h1>Page Not found</h1>} />
      <Route path={`/group/:groupId`} component={() => <Scoreboard scores={groupScores} /> } />
    </Switch>
  );
}

export default Group;
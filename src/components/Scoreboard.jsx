import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';

import { groupPageData, events } from '../assets/dummy-data.json';

import GroupPlayer from './GroupPlayer';

const Scoreboard = (props) => {
  const { groupId } = useParams();

  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  })

  return (
    <div className="group">
      <div className="group__grid group__grid-headers">
        <a href="/roster" className="group__grid-header group__grid-header--sticky">Player</a>
        { eventHeader.map(event => <a href={`/group/${groupId}/${event.name.replace(/\s/, '')}`}className="group__grid-header group__grid-header--scroll u-justify-self-center" key={`event-${event.id}`}>{event.name}</a>)}
      </div>
      <div>
        { props.scores.map(player => <GroupPlayer key={`group-${player.group_id}-player-${player.player_id}`} {...player}/>)}
      </div>
    </div>
  );
}

export default Scoreboard;
import React from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';

import { groupPageData, events } from '../assets/dummy-data.json';

import GroupPlayer from './GroupPlayer';

const Scoreboard = (props) => {
  let { path, url } = useRouteMatch();

  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  })

  const playerScores = props.scores.map(player => {
    let pointTotal = 0;

    player.event_scores.forEach(score => {
      pointTotal += score.event_points;
    });

    return {
      total_points: pointTotal,
      ...player
    }
  })
  .sort((a, b) => {
    if (a.total_points > b.total_points) return -1;
    if (a.total_points < b.total_points) return 1;
    return 0;
  })

  return (
    <div className="group">
      <div className="group__grid group__grid-headers">
        { props.disableLinks ? <p className="group__grid-header group__grid-header--sticky">Player</p> : <Link to="/roster" className="group__grid-header group__grid-header--sticky">Player</Link> }
        { props.disableLinks ? <p className="group__grid-header group__grid-header--scroll u-justify-self-center">Total</p> : <Link to="/scoreboard" className="group__grid-header group__grid-header--scroll u-justify-self-center">Total</Link>}

        { eventHeader.map(event => props.disableLinks ? <p className="group__grid-header group__grid-header--scroll u-justify-self-center" key={`event-${event.id}`}>{event.name}</p> : <Link to={`${url}/${event.name.replace(/\s/, '')}`} className="group__grid-header group__grid-header--scroll u-justify-self-center" key={`event-${event.id}`}>{event.name}</Link>)}
      </div>
      <div>
        { playerScores.map(player => <GroupPlayer key={`group-${player.group_id}-player-${player.player_id}`} {...player}/>)}
      </div>
    </div>
  );
}

export default Scoreboard;
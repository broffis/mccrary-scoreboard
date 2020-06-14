import React from 'react';

import { groupData } from '../assets/dummy-data.json';

const GroupPlayer = (props) => {
  const eventScores = props.event_scores.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  let [groupStyles] = groupData.filter(group => group.group_id === props.group_id);
  let boxStyles = {};

  if (groupStyles) {
    boxStyles = {
      borderColor: groupStyles.borderColor,
      backgroundColor: groupStyles.backgroundColor
    }
  }


  return (
    <div className="group-player group__grid">
      <div className="group-player__player-info" style={boxStyles}>
        <img src={`${window.location.origin}/${props.country_flag_url}`} alt={`Flag of ${props.country_name}`} />
        <p className="group-player__player-name font-secondary-semibold">{props.player_name_first} {props.player_name_last}<span className="country-subtext italics font-secondary-light">{props.country_name}</span></p>
      </div>
      <p className="group-player__score-box u-justify-self-center font-secondary-semibold" style={boxStyles}><span className="group-player__score font-secondary-semibold">{props.total_points}</span></p>
      { eventScores.map(event => <p className="group-player__score-box u-justify-self-center font-secondary-semibold" key={`${props.player_id}-${event.event_name}`} style={boxStyles}><span className="group-player__score font-secondary-semibold">{event.event_points ? event.event_points : '-'}</span></p>)}
    </div>
  )
};

export default GroupPlayer;
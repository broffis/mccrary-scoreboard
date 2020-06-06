import React from 'react';

const GroupPlayer = (props) => {
  const eventScores = props.event_scores.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  return (
    <div className="group-player group__grid">
      <div className="group-player__player-info">
        <img src={`${window.location.origin}/${props.country_flag_url}`} alt={`Flag of ${props.country_name}`} />
        <p className="group-player__player-name font-secondary-semibold">{props.player_name_first} {props.player_name_last}<span className="country-subtext font-secondary-light">{props.country_name}</span></p>
      </div>
      <p className="group-player__score u-justify-self-center font-secondary-semibold">{props.total_points}</p>
      { eventScores.map(event => <p className="group-player__score u-justify-self-center font-secondary-semibold" key={`${props.player_id}-${event.event_name}`}>{event.event_points ? event.event_points : '-'}</p>)}
    </div>
  )
};

export default GroupPlayer;
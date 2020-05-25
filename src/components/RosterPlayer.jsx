import React from 'react';

// import './player.scss';

const Player = (props) => {
  return (
    <div className="roster__player">
      <img className="roster__column country" src={props.country_flag_url} alt={`Flag of ${props.country_name}`} />
      <p className="roster__column player player-name font-semibold">{props.player_name_first} {props.player_name_last}<span className="country-subtext">{props.country_name}</span></p>
      <p className="roster__column group font-semibold">{props.group_name}</p>
    </div>
  );
};

export default Player;
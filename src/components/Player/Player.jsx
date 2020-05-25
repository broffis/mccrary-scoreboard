import React from 'react';

// import './player.scss';

const Player = (props) => {
  return (
    <div className="roster__player">
      <img className="roster__column country" src={props.country_flag_url} alt={`Flag of ${props.country_name}`} />
      <p className="roster__column player">{props.player_name_first} {props.player_name_last}</p>
      <p className="roster__column group">{props.group_name}</p>
    </div>
  );
};

export default Player;
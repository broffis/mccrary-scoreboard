import React from 'react';
import { Link } from 'react-router-dom';

const Player = (props) => {
  return (
    <div className="roster__player">
      <img className="roster__column country" src={props.country_flag_url} alt={`Flag of ${props.country_name}`} />
      <p className="roster__column player player-name font-secondary-semibold">{props.player_name_first} {props.player_name_last}<span className="country-subtext font-secondary-light">{props.country_name}</span></p>
      <Link className="roster__column group roster__column--link font-secondary-semibold" to={`/group/${props.group_id}`}>{props.group_name}</Link>
    </div>
  );
};

export default Player;
import React from 'react';

import Player from '../../components/Player/Player';

import { roster } from '../../assets/dummy-data.json';
// import './roster.scss';

const Roster = () => {

  return (
    <div className="roster">
      <div className="roster__header">
        <p className="roster__column country heading-3 font-semibold">Country</p>
        <p className="roster__column player heading-3 font-semibold">Player</p>
        <p className="roster__column group heading-3 font-semibold">Group</p>
      </div>
      { roster.map(player => <Player key={`player-${player.player_id}`} {...player}/>)}
    </div>
  );
};


export default Roster;
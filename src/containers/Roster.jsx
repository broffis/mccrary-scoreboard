import React from 'react';

import RosterPlayer from '../components/RosterPlayer';

import { roster } from '../assets/dummy-data.json';

const Roster = () => {

  return (
    <div className="roster">
      <div className="roster__hero">
        <img className="roster__hero-img" src="hero/Summer2020CapGF.png" />
      </div>
      <div className="roster__header">
        <p className="roster__column country heading-2 font-secondary-semibold">Country</p>
        <p className="roster__column player heading-2 font-secondary-semibold">Player</p>
        <p className="roster__column group heading-2 font-secondary-semibold">Group</p>
      </div>
      { roster.map(player => <RosterPlayer key={`player-${player.player_id}`} {...player}/>)}
    </div>
  );
};


export default Roster;
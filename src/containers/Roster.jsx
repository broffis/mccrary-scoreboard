import React from 'react';

import Hero from '../components/Hero';
import RosterPlayer from '../components/RosterPlayer';

import { roster } from '../assets/dummy-data.json';

const Roster = () => {

  return (
    <div className="roster">
      <Hero heroText="Roster"/>
      <div className="roster__header">
        <p className="roster__column roster__column--country font-secondary-semibold">Flag</p>
        <p className="roster__column roster__column--player font-secondary-semibold">Player<span className="country-subtext font-secondary-light">Country</span></p>
        <p className="roster__column roster__column--group font-secondary-semibold">Group</p>
      </div>
      { roster.map(player => <RosterPlayer key={`player-${player.player_id}`} {...player}/>)}
    </div>
  );
};


export default Roster;
import React from 'react';

import Hero from '../components/Hero';
import RosterPlayer from '../components/RosterPlayer';

import axios from '../modules/axios';
import { useEffect, useState } from 'react';

// import { roster } from '../assets/dummy-data.json';

const Roster = () => {
  const [roster, setRoster] = useState([]);
  useEffect(() => {
    axios.get('/players')
      .then(players => setRoster(players.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="roster">
      <Hero heroText="Roster"/>
      <div className="roster__header">
        <p className="roster__column roster__column--country font-secondary-semibold">Flag</p>
        <p className="roster__column roster__column--player font-secondary-semibold">Player<span className="country-subtext font-secondary-light">Country</span></p>
        <p className="roster__column roster__column--group font-secondary-semibold">Group</p>
      </div>
      { roster.map(player => <RosterPlayer key={`player-${player._id}`} {...player}/>)}
    </div>
  );
};


export default Roster;
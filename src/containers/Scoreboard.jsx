import React from 'react'

import { groupPageData } from '../assets/dummy-data.json';

import Scoreboard from '../components/Scoreboard';

const FullScoreboard = (props) => {

  console.log('groupPageData', groupPageData);

  return (
    <div>
      <Scoreboard scores={groupPageData} disableLinks />
    </div>
  );
}

export default FullScoreboard;
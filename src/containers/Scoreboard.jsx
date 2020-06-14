import React from 'react'

import { groupPageData } from '../assets/dummy-data.json';

import Scoreboard from '../components/Scoreboard';
import Hero from '../components/Hero';
import { useState } from 'react';

const FullScoreboard = (props) => {
  const [ activeTab, setActiveTab ] = useState('scoreboard');
  const tabs = [
    {
      label: 'Scoreboard',
      value: 'scoreboard'
    },
    {
      label: 'Seeding',
      value: 'seeding'
    }
  ];

  let display = <h2>Nothing selected</h2>;

  switch(activeTab) {
    case 'scoreboard':
      display = <Scoreboard scores={groupPageData} disableLinks />;
      break;
    case 'seeding':
      display = <h2>Seeding selected</h2>
      break;
    default:
  };

  console.log('groupPageData', groupPageData);

  return (
    <div>
      <Hero heroText="Scoreboard"/>      
      <ul className="scoreboard__buttons">
        { tabs.map(tab => <li className={`scoreboard__button ${ tab.value === activeTab ? '--is-active' : ''}`} onClick={() => setActiveTab(tab.value)}>{tab.label}</li>)}
      </ul>
      {
        display
      }
      
    </div>
  );
}

export default FullScoreboard;
import React from 'react';
import axios from '../modules/axios';

import Scoreboard from '../components/Scoreboard';
import Hero from '../components/Hero';
import { useState } from 'react';
import { useEffect } from 'react';

const FullScoreboard = (props) => {
  const competition_id = props.competition_id;
  // console.log('params competitionId', competitionId, 'props competitionId', props_comp_id);

  const [ activeTab, setActiveTab ] = useState('scoreboard');
  const [scores, setScores] = useState([]);
  const [events, setEvents] = useState([]);
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

  useEffect(() => {
    axios.get(`/events/filter/byComp/${competition_id}`)
      .then(evts => setEvents(evts.data));
  }, [competition_id]);

  useEffect(() => {
    axios.get(`/scores/filter/byComp/${competition_id}`)
    .then(scores => {
      // Reduces returned scores by player
      let filtered_players = scores.data.reduce((acc, current) => {
        const x = acc.find(item => item.player_id === current.player_id);
        if (!x) {
          return acc.concat([{
            player_id: current.player_id,
            player_name: current.player_name,
            country_name: current.country_name,
            country_flag: current.country_flag,
            group_id: current.group_id,
            event_scores: [],
            background_color: current.background_color,
            border_color: current.border_color
          }]);
        } else {
          return acc
        }
      }, [])


      // Aggregate scores by player
      scores.data.forEach(score => {
        let [scoring_player] = filtered_players.filter(player => player.player_id === score.player_id);
        let scoring_player_index = filtered_players.indexOf(scoring_player);

        filtered_players[scoring_player_index].event_scores.push({
          score_id: `${score._id}`,
          competition_id: score.competition_id,
          event_name: score.event_name,
          points: score.points,
          event_id: score.event_id
        })
      })

      // Add 0s for missing events
      filtered_players.forEach(player => {
        const event_scores = events.map(e => {
          let [player_score] = player.event_scores.filter(ps => ps.event_id === `${e._id}`);
          let player_score_index = player.event_scores.indexOf(player_score);


          let new_score = {
            score_id: null,
            event_id: e._id,
            event_name: e.event_name,
            points: 0,
            competition_id: competition_id
          }

          if (player_score_index >= 0) {
            new_score.points = player.event_scores[player_score_index].points;
            new_score.score_id = player.event_scores[player_score_index].score_id;
            new_score.competition_id = player.event_scores[player_score_index].competition_id;
          }

          return new_score
        });


        player.event_scores = event_scores.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
      });

      return filtered_players
    })
    .then(scores => setScores(scores))
  }, [competition_id, events])

  let display = <h2>Nothing selected</h2>;

  switch(activeTab) {
    case 'scoreboard':
      display = <Scoreboard scores={scores} disableLinks events={events}/>;
      break;
    case 'seeding':
      display = <h2>Seeding selected</h2>
      break;
    default:
  };

  return (
    <div>
      <Hero heroText="Scoreboard"/>      
      <ul className="scoreboard__buttons">
        { tabs.map(tab =><li key={`scoreboard_tabs--${tab.value}`} className={`scoreboard__button ${ tab.value === activeTab ? '--is-active' : ''}`} onClick={() => setActiveTab(tab.value)}>{tab.label}</li>)}
      </ul>
      {
        display
      }
      
    </div>
  );
}

export default FullScoreboard;
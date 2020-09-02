import React, { useEffect, useState } from 'react';
import { useParams, Switch, Route, useRouteMatch } from 'react-router-dom';
import axios from "../modules/axios";

// import { groupPageData, events, groupData } from '../assets/dummy-data.json';

import Scoreboard from '../components/Scoreboard.jsx';
import Hero from '../components/Hero.jsx';

const Group = (props) => {
  const { groupId } = useParams();
  let { path, url } = useRouteMatch();
  // const groupScores = groupPageData.filter(player => player.group_id === parseInt(groupId));
  const [group, setGroup] = useState([]);
  const [groupScores, setGroupScores] = useState([]);
  const [events, setEvents] = useState([]);

  

  
  useEffect(() => {
    axios.get(`/groups/${groupId}`)
      .then(g => setGroup(g.data))
  }, [groupId]);

  useEffect(() => {
    axios.get(`/events/filter/byComp/${group.competition_id}`)
      .then(evts => setEvents(evts.data));
  }, [group.competition_id]);


  useEffect(() => {
    axios.get(`/scores/filter/byGroup/${groupId}`)
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
              event_scores: []
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
              event_id: e._id,
              event_name: e.event_name,
              points: 0,
            }

            if (player_score_index >= 0) {
              new_score.points = player.event_scores[player_score_index].points;
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
      .then(scores => setGroupScores(scores))
  }, [events, groupId]);


  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  });

  // const [groupInfo] = groupData.filter(group => group.group_id === parseInt(groupId));

  const eventTitles = eventHeader.map(event => event.event_name.replace(/\s/, '')).join('|');

  return (
    <Switch>
      <Route path={`${url}/:event(${eventTitles})`} exact component={() => <h1>Event page Not found</h1>} />
      <Route path={url} component={() => (
        <React.Fragment>
          <Hero heroText={group.name} heroImage={group.logo} bgColor={group.heroColor}/>
          <Scoreboard scores={groupScores} disableLinks={false} groupId={groupId}/>
        </React.Fragment>
      ) } />
    </Switch>
    // <div>This is a test</div>
  );
}

export default Group;
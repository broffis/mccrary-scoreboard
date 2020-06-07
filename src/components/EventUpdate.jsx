import React from 'react';

const EventUpdate = (props) => {

  console.log('props', props);
  return (
    <div className="event-update">
      <div className="event-update__header">
        <p className="event-update__header-label">Player</p>
        <p className="event-update__header-label">Score</p>
      </div>
      <ul className="event-update__players">
        {
          props.scores.map(playerScore => (
            <li key={`${props.event.name.replace(/\s/, '-')}-${playerScore.player_id}`} className="event-update__player-row">
              <span className="event-update__player-name">{playerScore.player_name}</span>
              <span className="event-update__player-score">{playerScore.score.event_points ? playerScore.score.event_points : '-'}</span>
            </li>
          ))
        }
      </ul>
      <button class="button --primary --centered">
        Update Scores
      </button>
    </div>
  );
};

export default EventUpdate;
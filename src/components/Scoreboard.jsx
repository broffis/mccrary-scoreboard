import React, { useState } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';

import { groupPageData, events } from '../assets/dummy-data.json';

import GroupPlayer from './GroupPlayer';
import Modal from './Modal';
import EventUpdate from './EventUpdate';

const Scoreboard = (props) => {
  let { path, url } = useRouteMatch();

  const [activeEventData, setActiveEventData] = useState();
  const [showModal, setShowModal] = useState(false);

  const eventHeader = events.sort((a,b) => {
    if (a.id > b.id) return 1;
    if (a.id < b.id) return -1;
    return 0;
  })

  const playerScores = props.scores.map(player => {
    let pointTotal = 0;

    player.event_scores.forEach(score => {
      pointTotal += score.event_points;
    });

    return {
      total_points: pointTotal,
      ...player
    }
  })
  .sort((a, b) => {
    if (a.total_points > b.total_points) return -1;
    if (a.total_points < b.total_points) return 1;
    return 0;
  })

  const openEventModal = (eventId) => {
    let groupEventData = props.scores.map(player => {
      const playerScore = player.event_scores.filter(event => event.event_id === eventId);

      return {
        player_name: player.player_name_first.concat(' ', player.player_name_last),
        player_id: player.player_id,
        score: playerScore[0]
      }
    });

    let eventInfo = events.filter(event => event.id === eventId)[0];

    setActiveEventData({
      event: eventInfo,
      scores: groupEventData
    });

    setShowModal(true);
  };

  const toggleModal = () => {
    const modalIsOpen = showModal;
    setShowModal(!modalIsOpen);
  }

  return (
    <div className="group">
      {
        activeEventData ?
        
          <Modal
            show={showModal}
            modalClosed={toggleModal}
            header={activeEventData ? activeEventData.event.name : ''}
          >
            <EventUpdate {...activeEventData}/>
          </Modal> :
          null
      }

      <div className="scoreboard-wrapper">
        <div className="group__grid group__grid-headers">
          { props.disableLinks ? <p className="group__grid-header group__grid-header--sticky">Player</p> : <Link to="/roster" className="group__grid-header group__grid-header--sticky">Player</Link> }
          { props.disableLinks ? <p className="group__grid-header group__grid-header--scroll u-justify-content-center">Total</p> : <Link to="/scoreboard" className="group__grid-header group__grid-header--scroll u-justify-content-center">Total</Link>}

          { eventHeader.map(event => props.disableLinks ? 
              <p className="group__grid-header group__grid-header--scroll u-justify-content-center" key={`event-${event.id}`}>{event.name}</p> :
              <p className="group__grid-header group__grid-header--scroll u-justify-content-center" onClick={() => openEventModal(event.id)} key={`event-${event.id}`}>{event.name}</p>
            )}
        </div>
        <div>
          { playerScores.map(player => <GroupPlayer key={`group-${player.group_id}-player-${player.player_id}`} {...player}/>)}
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
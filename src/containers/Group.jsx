import React from 'react';
import { useParams } from 'react-router-dom';

import { groupPageData as data } from '../assets/dummy-data.json';

const Group = (props) => {
  const { groupId } = useParams();
  const groupScores = data.filter(player => player.group_id === parseInt(groupId));
  console.log('groupScores', groupScores, groupId, data);
  return (
    <div>Group page</div>
  );
}

export default Group;
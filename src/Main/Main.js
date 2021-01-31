import React from 'react';
import SplitPane from 'react-split-pane';
import RoomForm from './RoomForm/RoomForm';
import Rooms from './Rooms/Rooms';

const Main = () => {
  return (
    <div id="roomsAndForm">
      <Rooms />
      <RoomForm />
    </div>
  )
}
export default Main;
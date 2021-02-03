import React from 'react';
import SplitPane from 'react-split-pane';
import Introduce from './Introduce/Introduce';
import RoomForm from './RoomForm/RoomForm';
import Rooms from './Rooms/Rooms';

const Main = () => {
  return (
    <div id="roomsAndForm">
      <Introduce></Introduce>
      <Rooms />
      <RoomForm />
    </div>
  )
}
export default Main;
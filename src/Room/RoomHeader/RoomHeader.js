import React,{ useContext } from 'react';
import {Link} from 'react-router-dom';
import { roomContext } from '../Room';
import './roomheader.css'

const RoomHeader=()=> {
  const {room}=useContext(roomContext);
  return (
    <header id="room-header">
      <div id="room-name">
        <strong>{room["roomName"]}</strong>
			</div>
      <ul id="room-info">
        <li>参加者：{room["members"].length}</li>
				<li> 作成者：{room.madeUserName}</li>
        <li> 作成日時：{room.madeTime}</li>
        <li> メンバー：{room.members.length}人</li>
			</ul>
    </header>
    );
}

export default RoomHeader;
/*
<nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        エモいチャット(仮称)
      </Link>
    </nav>
 
*/
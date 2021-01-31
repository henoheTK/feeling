import React,{ useContext } from 'react';
import {Link} from 'react-router-dom';
import { userContext } from '../../App';
import { roomContext } from '../Room';
import './roomheader.css'
import firebase,{db} from '../../Firebase/Firebase';

const RoomHeader=()=> {
  const {room}=useContext(roomContext);
  const {userId} =useContext(userContext);


  // 削除用のAPIだがしかしサブコレクションの削除ができないとかなんとかで時間的に諦め
  const deleteRoomAPI=()=>{
    window.confirm("この操作は取り消せません。よろしいですか？");
    var result = window.confirm('この操作は取り消せません、よろしいですか？');
    if(result){
      const r=db.collection('/rooms').doc(room["id"]);
      if(r){
        db.collection('/rooms').doc(room["id"]).delete();
      }
    }
  }
  
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
      {console.log(room,room.madeUserId,userId)}
      
    </header>
    );
}

export default RoomHeader;
/*
 


    {room.madeUserId === userId &&
        <button onClick={deleteRoomAPI}>ルームを削除</button>
      }
*/
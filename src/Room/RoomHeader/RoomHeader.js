import React,{ useContext } from 'react';
import {Link} from 'react-router-dom';
import { userContext } from '../../App';
import { roomContext } from '../Room';
import './roomheader.css'
import firebase,{db} from '../../Firebase/Firebase';
import { deleteRoomSubCollection } from '../../CollectionDelete';

const RoomHeader=()=> {
  const {room}=useContext(roomContext);
  const {userId} =useContext(userContext);


  // 削除用のAPIだがしかしサブコレクションの削除ができないとかなんとかで時間的に諦め
  const deleteRoomAPI=()=>{
    var result = window.confirm('この操作は取り消せません、よろしいですか？');
    if(result){
      const r=db.collection('/rooms').doc(room['id']);
      const roomId=room['id']
      if(r){
        deleteRoomSubCollection(roomId,'newComment').then(()=>{
          deleteRoomSubCollection(roomId,'emotions').then(()=>{
            deleteRoomSubCollection(roomId,'reActions').then(()=>{
              deleteRoomSubCollection(roomId,'comments').then(()=>{
                r.delete().then(()=>{})
              })
            })
          })
        }).catch((error)=>{
          console.log('Error:'+error)
        });
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
      {room.madeUserId === userId &&
        <button id="room-delete" onClick={deleteRoomAPI}>ルームを削除</button>
      }
    </header>
    );
}

export default RoomHeader;
/*
 


    
*/
import React, {Component,useState,useEffect,current} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import firebase, { db } from '../../Firebase/Firebase';  
import SplitPane from 'react-split-pane';
import RoomForm from '../RoomForm/RoomForm';
import '../Rooms/rooms.css'

const Rooms = () => {

  const [rooms,setRooms]=useState(null);
  
  useEffect(() => {
    let unmounted=false;
    async function roomsData() {
      // ルームのデータを取得。
      const unsubscribe = await db.collection('/rooms').orderBy('timeStamp', 'asc').get().then(col=> {
        if(!unmounted){
          // idを配列に
          let roomids=col.docs.map(postCol => 
            postCol.id
          );
          // データの中身を取得
          let value=[];
          col.forEach((postCol) => {
            value.push(
              postCol.data()
            );
          });
          /* 本来は変わった部分だけいい感じにすべきなんだろうけど...時間足らず...
          col.docChanges().forEach(change => {
            console.log(change.doc.data());
          });
          */
          let rooms=[];
          // idとデータを合体
          for(let i = 0; i < roomids.length; i++){
            let d = value[i]["timeStamp"].toDate();
            rooms.push({
                roomName     : value[i]["roomName"],
                stageId      : value[i]["stageId"],
                madeTime     : d.getFullYear()+'/'+d.getMonth() + 1+'/'+d.getDate(),
                madeUserName : value[i]["madeUserName"],
                members      : value[i]["members"],
                id           : roomids[i],
              }
            )
          }
          setRooms(rooms);
        }
      });// ...
    };

    roomsData();
  }, []);
  return (
    <div id="rooms" className="list-group">
      {rooms === null && <p>Loading rooms...</p>}
      {
        rooms && rooms.map(room => (
          <li key={room.id} className="roomsItem list-group-item d-flex">
            <Link to={`/room/${room.id}`}>
              <h4 >{room.roomName}</h4>
            </Link>
            <h4 >作成者：{room.madeUserName}</h4>
            {console.log(room.madeTime)}
            <h4 >作成日時：{room.madeTime}</h4>
            <h4 >メンバー：{room.members.length}人</h4>
          </li>
        ))
      }
    </div>
  )
}

export default Rooms;
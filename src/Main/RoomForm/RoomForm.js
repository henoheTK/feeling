import React,{useContext} from 'react';
import firebase,{db} from '../../Firebase/Firebase';
import {userContext} from '../../App';

const RoomForm = () =>{
  const {userId,userInfo} =useContext(userContext);

  const roomAPI=()=>{
    let roomName = document.getElementById('nameInput').value;
    if(roomName.length > 0 && roomName.length<=15){
      let StageId  = document.getElementById('stage').value;
      console.log(roomName,StageId);
      db.collection('/rooms').add({
        roomName     : roomName,
        stageId      : StageId,
        madeUserId   : userId,
        madeUserName : userInfo['displayName'],
        timeStamp    : firebase.firestore.FieldValue.serverTimestamp(),
        members      : []
      }).then((docs) => {
        console.log(docs)
      }).catch(error => {
        // error
        console.log(error)
      });
    }else{
      alert('ルーム名は1文字以上、15文字以下である必要があります。');
    }
  }

  return(
    <div id="roomForm">
      <label htmlFor="name" >ルームの名前</label>
      <input id="nameInput" type="text" name="name" maxLength="15" /><br/>
      <label htmlFor="stage" defaultValue="0">ステージ</label>
      <select id="stage" name="stage" className="custom-select">
        <option value="0">Zero</option>
        <option value="1">One</option>
        <option value="2">Two</option>
      </select><br/>
      <button onClick = {roomAPI}>投稿</button>
    </div>
  )
}
export default RoomForm;
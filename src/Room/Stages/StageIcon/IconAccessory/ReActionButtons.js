import React, { useContext } from 'react';
import firebase,{db} from '../../../../Firebase/Firebase';
import {roomContext} from '../../../Room';
import {userContext} from '../../../../App';
import './iconacce.css'

const ReActionButtons = (props) =>{
  const {room} = useContext(roomContext)
  const {userId} = useContext(userContext)

  const reActionAPI= (e)=>{
    const reAction=e.target.dataset.name;
    const toUserId=e.target.dataset.user;
    console.log(reAction,toUserId);
      db.collection('rooms').doc(room['id']).collection('reActions').add({
      name      : reAction,
      from      : userId,
      to        : toUserId,
      timeStamp : firebase.firestore.FieldValue.serverTimestamp()
    }).then((doc)=>{
      setTimeout(function(){
        db.collection('rooms').doc(room['id']).collection('reActions').doc(doc.id).delete();
      }, 3000);
    }).catch((error)=>{
      console.log(error);
    })
  }
  return(
    <div className="icon-acce reActionbuttons">
      <button className="reActionButton" onClick={reActionAPI} data-name="good" data-user={props.renderId}>good</button>  
      <button className="reActionButton" onClick={reActionAPI} data-name="kusa" data-user={props.renderId}>草</button>  
      <button className="reActionButton" onClick={reActionAPI} data-name="question" data-user={props.renderId}>？</button>  
    </div>
  )
}

export default ReActionButtons;
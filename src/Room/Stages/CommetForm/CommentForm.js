import React, { Component, createContext,useContext,useState,useEffect } from 'react';
import {roomContext} from '../../Room';
import { stageContext } from '../Stage';
import {userContext} from '../../../App';
import firebase, {db} from '../../../Firebase/Firebase'



const Form=()=>{
  const {room}=useContext(roomContext);
  const {emotions,setEmotions}=useContext(stageContext);
  const {userId,userInfo}=useContext(userContext);
  useEffect(()=>{
    // スペースキーが押されたら投稿
    document.body.addEventListener('keydown',
    event => {
      if (event.key === 'Enter' && event.ctrlKey) {
        commentAPI();
      }
    });  
  },[]);

  // コメント投稿のAPI
  function commentAPI (){  
    let content=document.getElementById('inputComment').value;
    // 0文字より多く、300文字より少なく入力されているなら
    if(content.length>0&&content.length<=300){
      let roomId=room['id'];
      let emotion;
      if(emotions[userId]){
        emotion=emotions[userId];  
      }else{
        emotion=null;
      }
      db.collection('rooms').doc(roomId).collection('comments').add({
        content   : content,
        userId    : userId,
        userName  : userInfo['displayName'],
        emotion   : emotion,
        timeStamp : firebase.firestore.FieldValue.serverTimestamp()
      })
      db.collection('rooms').doc(room['id']).collection('newComment').doc(userId).set({
        content   : content,
        timeStamp : firebase.firestore.FieldValue.serverTimestamp()
      }).then(()=>{
        // フォームの中身をなくす
        document.getElementById('inputComment').value='';
        // 6秒後にステージ用のコメントを消す。
        setTimeout(function(){
          db.collection('rooms').doc(room['id']).collection('newComment').doc(userId).delete();
        }, 6000)}
      )
    }
  }
  // エモートのAPI
  const emoteAPI= (e)=>{
    const emote=e.target.dataset.kind;
    console.log(emote);
    if(emote===null){
      db.collection.doc(room['id']).collection('emotions').doc(userId).delete();
    }else{
      db.collection('rooms').doc(room['id']).collection('emotions').doc(userId).set({
        kind      : emote,
        timeStamp : firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }

  return(
    <div id="commentForm">
      <div id="emotions">
        <button className="emotoButton" onClick={emoteAPI} data-kind="henoheno">へのへの</button>
        <button className="emotoButton" onClick={emoteAPI} data-kind="null">なし</button>  
        <button className="emotoButton" onClick={emoteAPI} data-kind="yurei">ユーレイ</button>
        <button className="emotoButton" onClick={emoteAPI} data-kind="happy">ニコニコ</button>  
        <button className="emotoButton" onClick={emoteAPI} data-kind="angry">怒り</button>  
        <button className="emotoButton" onClick={emoteAPI} data-kind="naki">泣き</button>  
      </div>
      <div className="form">
        <input id="inputComment" />
        <button type="submit" maxLength="300" onClick={commentAPI}>投稿</button>
      </div>
    </div>
    )
}
export default Form;
import React, { Component, createContext,useContext,useState,useEffect } from 'react';
import axios from 'axios';
import Icon from '../IconRender'
import Stage from './Stages/Stage';
import SplitPane from 'react-split-pane';
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import Comments from './Comments/Comments';
import firebase, { db } from '../Firebase/Firebase'; 
import {userContext} from '../App'
import RoomHeader from './RoomHeader/RoomHeader';
import './room.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const defaultSplitSize=800;

const Room = () => {
  const [room,setRoom] = useState(null);
  const [isRoom,setIsRoom] = useState(null);
  const [comments,setComments] = useState(null);
  const [splitSize,setSplitSize] = useState(defaultSplitSize);
  const [members,setMembers] = useState(null);
  const {isOnline,userId,userInfo} = useContext(userContext);
  // URLのパラメータを取得
  var Path = window.location.pathname;
  var roomId = Path.split('/')[2];
  
  useEffect(()=>{
    async function roomData() {
      const roomUnsubscribe = await db.collection('/rooms').doc(roomId).onSnapshot(doc=> {
        if(doc.exists){
          let value=doc.data();
          console.log(userId,value['members']);
          console.log(value['members'].indexOf(userId)===-1);
          if(value['members'].indexOf(userId)===-1){
            console.log('追加');
            db.collection('rooms').doc(roomId).update({
              members: firebase.firestore.FieldValue.arrayUnion(userId)
            })
            db.collection('users').doc(userId).update({
              rooms: firebase.firestore.FieldValue.arrayUnion(roomId)
            })
            db.collection('users').doc(userId).update({
              room: roomId
            })
          }
          let d = value['timeStamp'].toDate();
          let roomData={
            id           : doc.id,
            roomName     : value['roomName'],
            stageId      : value['stageId'],
            madeTime     : d.getFullYear()+'/'+d.getMonth() + 1+'/'+d.getDate(),
            madeUserName : value['madeUserName'],
            members      : value['members'],

          }
          setIsRoom(true);
          setRoom(roomData);
        }else{
          setIsRoom(false);
        }
      });
      return () => roomUnsubscribe();
    };
    roomData();
  },[])

  useEffect(() => {
    async function commentsData(){
      if(isRoom){
        const commentsUnsubscribe = await db.collection('/rooms').doc(roomId).collection('comments').orderBy('timeStamp', 'asc').onSnapshot(data=> {
          let commentIds=data.docs.map(doc => 
            doc.id
          );
          let value=[];
          data.forEach((doc) => {
            value.push(
              doc.data()
            );
          });
          let comments=[];
           for(let i = 0; i < commentIds.length; i++){
            comments.push(
              {
                id       : commentIds[i],
                content  : value[i]['content'],
                emotion  : value[i]['emotion'], 
                userId   : value[i]['userId'],
              }
            )
          }
          console.log(commentIds,comments,data);
          setComments(comments);
        });// ...
        return () => commentsUnsubscribe();
      }
    }
    
    async function membersData(){
      if(isRoom){
          const memberUnsubscribe= await db.collection('rooms').doc(roomId).onSnapshot(async doc=>{
          const memberIds=doc.data()['members'];
          console.log(memberIds);
          if(memberIds&&memberIds.length!==0){
            await db.collection('users').where('userId','in',memberIds).get().then(infos=>{
              if(!infos.empty){
                console.log(infos);
                let value={};
                infos.docs.forEach(info=>{
                  let data=info.data();
                  let memberId=info.data()['userId'];
                  value[memberId]={
                    displayName : data['displayName'],
                    oneWord     : data['oneWord'],
                    iconInfo    : data['iconinfo']
                  }
                })
                console.log(value,infos,infos.docs);
                setMembers(value);
              }
              //infos.push(info.data()['iconinfo']);
            });
          }
        });
        return () => memberUnsubscribe();
      }
    }
    
    commentsData();
    membersData();
  
    //unsubscribe();
    
  }, [isRoom]);
  
  
//  <Icon iconInfo={this.state.room.iconInfo.filter(i => (i.id === parseInt(comment.userId)))[0].value}/>

  
  //if (this.state.room === null) return <p>Loading ...</p>;
  return (
    //<Nomal />
        //<Icon iconInfo={room.iconInfo[0].value}/>
    <div className="container">
      {isRoom===null && <p>Loading Room...</p>}
      {isRoom===true&&
        <roomContext.Provider value={{members,setMembers,room,setRoom,comments,setComments,splitSize,setSplitSize}}>
          {room===null && <p>Loading Room...</p>}
          {room &&
            <div className="row">
              <RoomHeader />
              <SplitPane split="vertical" minSize={300} defaultSize={defaultSplitSize} maxSize={1000} style={{"height":window.innerHeight-101}}>
                <div id='left' style={{'display':'flex'}}>
                  {members === null && <p>Loading Stage...</p>}
                  {members !== null&&<Stage/>}
                </div>
                <div id="right" >
                  {comments === null && <p>Loading Ccomments...</p>}
                  {comments !==null && <Comments />}
                </div>
              </SplitPane>
            </div>
          }
        </roomContext.Provider>
      }
      {isRoom==false &&
        <Redirect to = {'/error'} />
      }
    </div>
  )
}
/*
<img key={name} className="icon" src={"./images/icon/"+comment.iconinfo.info[name]["kind"]+"_"+name+".png"} style={{
                    height   :comment.iconinfo.info[name]["sizeY"]/3  + "px" ,
                    width    :comment.iconinfo.info[name]["sizeX"]/3  + "px" ,
                    top      :comment.iconinfo.info[name]["posY"]/3 + "px" ,
                    left     :comment.iconinfo.info[name]["posX"]/3 + "px" ,
                    position :"absolute" , 
                    transform:"rotate("+comment.iconinfo.info[name]["rot"]+"deg)",
                  }} />


                  <img key={info[0]} className="icon" src={"../images/icon/"+info[1]["kind"]+"_"+info[0]+".png"} style={{
                    height   :info[1]["sizeY"]/3  + "px" ,
                    width    :info[1]["sizeX"]/3  + "px" ,
                    top      :info[1]["posY"]/3 + "px" ,
                    left     :info[1]["posX"]/3 + "px" ,
                    position :"absolute" , 
                    transform:"rotate("+info[1]["rot"]+"deg)",
                  }} />



                  this.state.comments.map(comment => (
              <div key={comment.id.toString()} className="comment">
                  <Icon iconInfo={this.state.room.iconInfo.filter(i => (i.id === parseInt(comment.userId)))[0].value}/>
                <h1 className="">{comment.content}</h1>
              </div>
            ))
*/
const roomContext=createContext([]);
export {roomContext};
export default Room;
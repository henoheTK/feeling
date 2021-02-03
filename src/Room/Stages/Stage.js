
import React, {Timestamp,useEffect,useContext,createContext,useState} from 'react';
import './stage.css';
import Nomal from './Nomal/Nomal';
import {roomContext} from '../Room';
import {userContext} from '../../App';
import firebase , {db} from '../../Firebase/Firebase'
import CommentForm from './CommetForm/CommentForm'
import SplitPane from 'react-split-pane';
import randomMoveTimer from '../../IconRandomMove';


const IconMove=()=>{
  let timers=[];
  for(let i=0;i<timers.length;i++){
    clearInterval(timers[i]);
  }
  timers=[];
  const iconparts=  document.getElementsByClassName('stage-iconparts');
  for(let i=0;i<iconparts.length;i++){
    timers.push(randomMoveTimer(iconparts[i],1000));
  }
  return timers;
}

const stageRadius=600;
function Stage(props){
  const {userId} = useContext(userContext);
  const {icons,splitSize,room} = useContext(roomContext);
  const [newComment,setNewComment] = useState(null);
  const [emotions,setEmotions] = useState({});
  const [reActions,setActions] = useState({});
  const roomId=room['id'];

  useEffect(()=>{
    async function emotionData(){
      var now = new Date();
      var before5min_unix = new Date(now.getTime() - 5000);
      console.log(before5min_unix,now);
      //var before5min = Timestamp(before5min_unix);
      const emoteUnsubscribe = await db.collection('/rooms').doc(roomId).collection('emotions').where('timeStamp','>',before5min_unix).onSnapshot(data=> {
        console.log(data);
        let value=[];
        let emoteIds=data.docs.map(doc => 
          doc.id
        );
        data.forEach((doc) => {
          value.push(
            doc.data()
          );
        });
        let emotes={};
        for(let i = 0; i < emoteIds.length; i++){
          emotes[emoteIds[i]]=value[i]['kind'];
        }
        console.log(data,value,emotes,"ん");
        setEmotions(emotes);
      });
      return () => emoteUnsubscribe();
    }
    async function newCommentData(){
      var now = new Date();
      // 6秒以内のnewCommentを取得
      // 本来は、コメントが増えたタイミングでバックエンドからイベントを起こすようにした方がいいのだろうが、firebaseでは有料だったのでこのように実装
      var before6sec_unix = new Date(now.getTime() - 6000);
      const newCommentUnsubscribe = await db.collection('/rooms').doc(roomId).collection('newComment').where('timeStamp','>',before6sec_unix).onSnapshot(data=> {
        let value=[];
        let newCommentIds=data.docs.map(doc => 
          doc.id
        );
        data.forEach((doc) => {
          value.push(
            doc.data()
          );
        });
        let newComment={};
        for(let i = 0; i < newCommentIds.length; i++){
          newComment[newCommentIds[i]]=value[i]['content'];
        }
        console.log(data,value,newComment,"ん");
        setNewComment(newComment);
      });
      return () => newCommentUnsubscribe();
    }
    async function reActionData(){
      var now = new Date();
      var before5sec_unix = new Date(now.getTime() - 5000);
      console.log(before5sec_unix,now);
      //var before5min = Timestamp(before5min_unix);
      const emoteUnsubscribe = await db.collection('/rooms').doc(roomId).collection('reActions').where('timeStamp','>',before5sec_unix).onSnapshot(data=> {
        let value=[];
        let reActionIds=data.docs.map(doc => 
          doc.id
        );
        data.forEach((doc) => {
          value.push(
            doc.data()
          );
        });
        let reActionDatas={};
        for(let i = 0; i < reActionIds.length; i++){
          if(!reActionDatas[value[i]['to']]){
            reActionDatas[value[i]['to']]=[];
          }
          reActionDatas[value[i]['to']].push({
            id   : reActionIds[i],
            name : value[i]['name'],
            from : value[i]['from'],
            to   : value[i]['to'],
          });
        }
        console.log(data,value,reActionDatas,"ん");
        setActions(reActionDatas);
      });
      return () => emoteUnsubscribe();
    }
    emotionData();
    newCommentData();
    reActionData();
  },[])
  useEffect(()=>{
    let moveTimer=IconMove();
    return ()=>{
      moveTimer.forEach(timer => {
        clearInterval(timer);
      });
    }
  })


  return (
    <stageContext.Provider value={{newComment,setNewComment,emotions,setEmotions,reActions,setActions}}>
      <SplitPane split="horizontal" defaultSize={window.innerHeight-171}>
        <div id="stage" >
          <Nomal stageRadius={stageRadius}/>
        </div>
        <CommentForm />
      </SplitPane>
    </stageContext.Provider>
  );
}
const stageContext=createContext([]);
export {stageContext};
export default Stage;
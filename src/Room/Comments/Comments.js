import React, {Component,useContext, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import {roomContext} from '../Room';
import Icon from '../../IconRender';
import {db} from '../../Firebase/Firebase'
import './comments.css'
import randomMoveTimer from '../../IconRandomMove';

const iconSize=50;

const IconMove=()=>{
  let timers=[];
  for(let i=0;i<timers.length;i++){
    clearInterval(timers[i]);
  }
  timers=[];
  const iconparts=  document.getElementsByClassName('comments-iconparts');
  for(let i=0;i<iconparts.length;i++){
    timers.push(randomMoveTimer(iconparts[i],1000));
  }
  return timers;
}

const Comments=()=>{
  const {comments,room,members} = useContext(roomContext);
  var Path = window.location.pathname;

  useEffect(()=>{
    let moveTimer=IconMove();
    return ()=>{
      moveTimer.forEach(timer => {
        clearInterval(timer);
      });
    }
  })

  return (
    <div id='comments' className="list-group">
      {comments && members &&
        comments.map(comment=>(
          <div key={comment.id.toString()} className="comment list-group-item d-flex">
            <div className='iconMask commentIcon'>
              <Icon iconInfo={members[comment.userId]['iconInfo']} iconSize={iconSize} emotion={comment.emotion} where='comments'/>
            </div>
            <div>
              {console.log(members)}
              <strong className="userName mb-1" style={{}}>{members[comment.userId]['displayName']}</strong>
              <h3 className="commentContent" style={{}}>{comment.content}</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Comments;
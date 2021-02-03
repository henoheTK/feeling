import React,{useContext} from 'react';
import { roomContext } from '../../../Room';
import {stageContext} from '../../Stage';
import './iconacce.css'

const ReActions = (props) =>{
  const {reActions}=useContext(stageContext);
  const {members}=useContext(roomContext);

  function randomPos(max){
    return  Math.floor(Math.random() * Math.floor( max ) ) - ( max / 2 );
  }

  return(
    <div id="" className="reActions icon-acce">
      {console.log(props.renderId,reActions)}
      {reActions[props.renderId].map(element => (
        <div key={element['id']} className="reaction" style={{"top":-150+randomPos(100),"left":randomPos(100)}}>
          <img src={"../../../../../images/reactions/"+element['name']+".png"} className="reactionImg"></img>
          {members[element['from']]['displayName'].length > 9 &&
            <h4 className="reaction-from">{members[element['from']]['displayName'].substr( 0, 9 )+"..."}</h4>
          }
          {members[element['from']]['displayName'].length <= 9 &&
            <h4 className="reaction-from">{members[element['from']]['displayName']}</h4>
          }
        </div>
      ))}
    </div>
  )
}

export default ReActions;
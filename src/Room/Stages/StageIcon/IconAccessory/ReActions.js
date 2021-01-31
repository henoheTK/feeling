import React,{useContext} from 'react';
import {stageContext} from '../../Stage';
import './iconacce.css'

const ReActions = (props) =>{
  const {reActions}=useContext(stageContext);

  return(
    <div id="" className="reActions icon-acce">
      {console.log(props.renderId,reActions)}
      {reActions[props.renderId].map(element => (
        <div key={element['id']}>
          <img src={"../../../../../images/reactions/"+element['name']+".png"} className="reactionImg"></img>
        </div>
      ))}
    </div>
  )
}

export default ReActions;
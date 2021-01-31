import React,{useContext} from 'react';
import {stageContext} from '../../Stage';
import './iconacce.css'

const ReActions = (props) =>{
  const {reActions}=useContext(stageContext);

  return(
    <div id="reActions" className="icon-acce">
      {console.log(props.renderId,reActions)}
      {reActions[props.renderId].map(element => (
        <div key={element['id']}>
          <h1>{element['name']}</h1>
        </div>
      ))}
    </div>
  )
}

export default ReActions;
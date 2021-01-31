import React,{useContext} from 'react';
import {stageContext} from '../../Stage';
import './iconacce.css'

const NewComment = (props) =>{
  const {newComment}=useContext(stageContext);

  return(
    <div className="balloon1 icon-acce top"  key={props.renderId}>
      <div className="balloon1-text">
        <p>{newComment[props.renderId]}</p>
      </div>
    </div>
  )
}

export default NewComment;
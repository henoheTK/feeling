
import React, {Timestamp,useEffect, useContext} from 'react';

import './nomal.css';
import StageIcon from '../StageIcon/StageIcon'
import { roomContext } from '../../Room';

function Nomal(props){
  const {members,room} = useContext(roomContext);

  return (
    <div id="nomal">
      {console.log(Object.keys(members),room,members,room['members'],room['members'],room['members'][0],members[room['members'][0]])}
      {Object.keys(members).map((m,index)=>(
        <div key={'icondiv'+index} className='icondiv'>
          <StageIcon renderInfo={[room['members'][index],members[room['members'][index]]]}/>
        </div>
      ))
      }
    </div>
  );
}


export default Nomal;


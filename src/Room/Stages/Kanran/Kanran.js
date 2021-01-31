
import React, {Timestamp,useEffect, useContext} from 'react';

import './kanran.css';
import StageIcon from '../StageIcon/StageIcon'
import { roomContext } from '../../Room';

const stageRadius=150;
const pos=[[50,0],[90,50],[50,90],[0,50]];
function kanran(props){
  const {members,room} = useContext(roomContext);
  return (
    <div id="kanransya">
      <div id="kanran" className="" style={{"objectFit": "scale-down"}}>
        {pos.map((p,index)=>(
          <div className="sya" key={'sya-'+index} style={{width:'10%',height:'10%',top:p[0]+"%",left:p[1]+"%",position:'absolute'}}>
            {console.log(index,room['members'][index],room['members'],members,members[room['members'][index]])}
            {room['members'].length > index &&
              <StageIcon renderInfo={[room['members'][index],members[room['members'][index]]]}/>
            }
            {room['members'].length <= index &&
              <h1>車</h1>
            }
          </div>
        
          ))}
        </div>
    </div>
  );
}


export default kanran;

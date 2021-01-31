import React, { useState, useContext  } from 'react';
import { act } from 'react-dom/test-utils';
import {GetPartsKinds} from '../IconData';
import {makeIconContext} from '../MakeIcon';
import '../makeIcon.css'


const PartsSelect=()=>{
  const {setNowKind,nowKind,nowName} = useContext(makeIconContext);


  return(
    <div id="makeIconButtons" className={nowName+"button"}>
      {console.log(nowName)}
      {Object.entries(GetPartsKinds(nowName)).map((value)=>(
        <button 
          key={value[0]} 
          className={value[0]+" "+nowName+" "+"iconKindButton btn-text-3d"} 
          data-name={nowName} data-kind={value[0]}  
          onClick={(e)=>{
            setNowKind(e.target.dataset.kind);
            document.getElementsByClassName('iconKindButton').forEach(activeElement => {
              if(activeElement.classList.contains('active')){
                activeElement.classList.remove('active');
              }
            });
            e.target.classList.add('active');
          }}
        >{value[1]["displayKind"]}</button>
      ))}
    </div>
  )
}
//  
// data-partsName={nowName}

export default PartsSelect;
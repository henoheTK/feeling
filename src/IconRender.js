import React, { Component, createContext,useContext,useState } from 'react';

// 感情の変化させるパーツの配列。
const emoteParts={
  'happy':[
    'leftEye','rightEye','mouth'
  ],
  'angry':[
    'leftEye','rightEye','mouth'
  ],
  'naki':[
    'leftEye','rightEye','mouth'
  ],
  'yurei':[
    'leftEye','rightEye','mouth'
  ],
  'thinking':[
    'leftEye','rightEye','mouth'
  ],
  'henoheno':[
    'leftEye','rightEye','mouth','nose','face'
  ]
}

// propsはiconInfoとiconSize、emotion、where。
const Icon=(props)=>{
  const Parts=(parts)=>{
    const info=parts.info;
    // 感情がある場合にはその感情のパス、ない場合は保存されてるパスを渡す。
    let path;
    //rotは、感情がある場合0で渡す
    let rot;
    console.log(props.emotion,props.emotion!==null);
    if(props.emotion!=='null'&&props.emotion&&emoteParts[props.emotion].indexOf(info[0])!==-1){
      path="../images/icon/"+props.emotion+"_"+info[0]+".png";
      rot=0;
    }else{
      path="../images/icon/"+info[1]["kind"]+"_"+info[0]+".png";
      rot=parseInt(info[1]["rot"]);
    }
    return(
      <img key={info[0]} className={props.where+"-iconparts "+info[0]} src={path} style={{
        height  : (info[1]["sizeY"] / 300) * props.iconSize + "px" ,
        width   : (info[1]["sizeX"] / 300) * props.iconSize + "px" ,
        top     : (info[1]["posY"]  / 300) * props.iconSize + "px" ,
        left    : (info[1]["posX"]  / 300) * props.iconSize + "px" ,
        position :"absolute" , 
        transform:"rotate("+rot+"deg)",
      }} />
    )
  }
  return (
    <div className={props.where+"-icon"} style={{position:"relative", height:props.iconSize+"px", width:props.iconSize+"px"}}>
      {console.log(props.iconInfo)}
      {Object.entries(props.iconInfo).map(info => (
        <Parts key={info[0]} info={info}></Parts>
      ))}  
    </div>
  );
}

export default Icon;

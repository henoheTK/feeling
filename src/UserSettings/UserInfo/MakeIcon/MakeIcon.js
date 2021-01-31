import React, {createContext, useContext, useState, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
import './makeIcon.css'
import {GetImgsInfoAllAll, GetImgsInfoEach, GetPartsAll, GetRotMax, GetRotMin, GetRotNow, GetSizeMax, GetSizeMin, GetSizeXNow, SetImgsInfoAll, SetImgsInfoAllAll, SetRotNow, SetSizeNowAll, SetSizeXYNow} from './IconData';
import firebase,{db} from '../../../Firebase/Firebase'
import {userContext} from '../../../App';
import PartsSelect from './PartsSelect/PartsSelect';

const imgPath='./images/icon/';

const MakeIcon =()=> {
  const [ nowKind , setNowKind ] = useState(null); 
  const [ nowName , setNowName ] = useState('face');
  const [ nowSize , setNowSize ] = useState(30);
  const [ nowRot  , setNowRot  ] = useState(0);
 
  const {userInfo}=useContext(userContext);

  useEffect(()=>{
    if(userInfo){
      // 今のアイコンの情報を描画したりデータにセットしたり。
      SetImgsInfoAllAll(userInfo['iconinfo']);
      Object.entries(userInfo['iconinfo']).forEach(partInfo => {
        SetSizeXYNow(partInfo[0],partInfo[1]['sizeX'],partInfo[1]['sizeY']);
        SetRotNow(partInfo[0],partInfo[1]['rot']);
        let img=document.getElementById(partInfo[0]+'Img');
        if(!img){
          img = document.createElement('img');
          img.classList.add('set-image');
          img.classList.add(partInfo[0]);
          img.id=partInfo[0]+'Img';
        }
        attach(img,partInfo[1]['sizeX'],partInfo[1]['sizeY'],partInfo[1]['posX'],partInfo[1]['posY'],partInfo[1]['rot'],partInfo[1]['kind'],partInfo[0]);
      });
    }
    const facekind=GetImgsInfoEach(nowName,'kind');
    // 選択してあるものをactiveに
    document.getElementsByClassName('iconNameButton').forEach(activeElement => {
      console.log(activeElement);
      if(activeElement.classList.contains(nowName)){
        activeElement.classList.add('active');
      }
    });
    document.getElementsByClassName('iconKindButton').forEach(activeElement => {
      if(activeElement.classList.contains(facekind)){
        activeElement.classList.add('active');
      }
    });
    setNowKind(GetImgsInfoEach(nowName,'kind'));
  },[userInfo]);
  
  useEffect(()=>{
    const facekind=GetImgsInfoEach(nowName,'kind');
    document.getElementsByClassName('iconKindButton').forEach(activeElement => {
      if(activeElement.classList.contains('active')){
        activeElement.classList.remove('active');
      }
      if(activeElement.classList.contains(facekind)){
        activeElement.classList.add('active');
      }
    });
    setNowKind(facekind);
  },[nowName])

  // マウスが動いた時に画像を追従させる関数
  const mouthmove = e =>{
    // マウスの位置ー画像のサイズの半分で計算。
    let mouseX = e.clientX-Math.floor(nowSize/2);
    let mouseY = e.clientY-Math.floor(nowSize/2);
    // 無限にレンダーがかかりそうなのでここはステートを使ってない
    document.getElementById('traceImage').style.top  = mouseY + 'px';
    document.getElementById('traceImage').style.left = mouseX + 'px';
  }


  // 画像を配置する関数
  const attachByClick = e =>{
    inputSizeSet();
    inputRotSet();
    let img=document.getElementById(nowName+'Img');
    if(!img){
      img = document.createElement('img');
      img.classList.add('set-image');
      //img.classList.add(nowName+'_'+nowKind);
      img.classList.add(nowName+'Img');
      img.id=(nowName);
    }
    let clientRect = document.getElementById('icon-space').getBoundingClientRect() ;

    let px = window.pageXOffset + clientRect.left ;

    // ページの上端から、要素の上端までの距離
    let py = window.pageYOffset + clientRect.top ;
    let mouseX =e.clientX;
    let mouseY =e.clientY;

    let x = mouseX-px-Math.floor(document.getElementById('sizeInput').value / 2);
    let y = mouseY-py-Math.floor(document.getElementById('sizeInput').value / 2);
    attach(img,document.getElementById('sizeInput').value,document.getElementById('sizeInput').value,x,y,document.getElementById('rotInput').value,nowKind,nowName)
    document.getElementById('save-button').classList.add('active')
  }
  const attach=(img,sizex,sizey,x,y,rot,kind,name)=>{
    img.src             = imgPath + kind + '_' + name + '.png';
    img.style.width     = sizex + 'px';
    img.style.height    = sizey + 'px';
    img.style.position  = 'absolute';
    img.style.left      = x + 'px';
    img.style.top       = y + 'px';
    img.style.transform = 'rotate('+rot+'deg)';
    let values={
      posX  : x     ,
      posY  : y     ,
      sizeX : sizex ,
      sizeY : sizey ,
      rot   : rot   ,
      kind  : kind
    };
    document.getElementById('icon-space').appendChild(img);
    SetImgsInfoAll(name,values);
  }



  // 
  const tracehide=()=>{
    document.getElementById('traceImage').style.display = 'none';
  }

  function traceshow(){
    document.getElementById('traceImage').style.display = 'block';
  }

  


  let sizeTimer;
  const sizeChange = (e) => {
    if(sizeTimer){
      clearTimeout(sizeTimer);
    }
    sizeTimer = setTimeout(inputSizeSet, 1000);
      

//      document.getElementById('traceImage').style.width = e.target.value+'px';
//      document.getElementById('traceImage').style.height = e.target.value+'px';
  }

  let rotTimer;
  const rotChange = (e) => {
    if(rotTimer){
      clearTimeout(rotTimer);
    }

    rotTimer = setTimeout(inputRotSet, 1000);
      //document.getElementById('traceImage').style.transform ='rotate(' +e.target.value+'deg)';
  }

  // 回転をmaxminとかいい感じにてくれる関数
  const inputRotSet=(name)=>{
    if(!name){
      name=nowName;
    }
    let input    = document.getElementById('rotInput');
    let inputRot = input.value;
    let nextRot;
    let maxRot   = GetRotMax(name);
    let minRot   = GetRotMin(name);

    if(maxRot < inputRot){
      nextRot=maxRot
    }else if(minRot > inputRot){
      nextRot=minRot
    }else{
      nextRot=inputRot
    }
    SetRotNow(name , nextRot);
    setNowRot(nextRot);
    input.value=nextRot;
  }
  // サイズをmaxminとかいい感じにてくれる関数
  const inputSizeSet=(name)=>{
    if(!name){
      name=nowName;
    }
    let input     = document.getElementById('sizeInput');
    let inputSize = input.value;
    let nextSize;
    let maxSize   = GetSizeMax(name);
    let minSize   = GetSizeMin(name);
    
    if(maxSize < inputSize){
      nextSize = maxSize
    }else if(minSize > inputSize){
      nextSize = minSize;
    }else{
      nextSize = inputSize;
    }
    SetSizeXYNow(name , nextSize , nextSize);
    setNowSize(nextSize);
    input.value=nextSize;
  }

  const {userId} = useContext(userContext);
    return (
      <div id="makeIcon">
        {userInfo===null&&
          <p>loading infos...</p>
        }
        {userInfo!==null&&
          <makeIconContext.Provider value = {{nowKind , setNowKind , nowName , setNowName , nowSize , setNowSize , nowRot , setNowRot}}>
          <div  id = "icon-space" className="iconMask"  onMouseMove = {mouthmove}  onMouseLeave = {tracehide}  onMouseEnter = {traceshow}  onClick = {attachByClick} />
          {console.log(imgPath + nowKind + nowName + "png")}
          <img  id = "traceImage"  src = { imgPath + nowKind + "_" + nowName + ".png" }  style = {{ height : nowSize + "px" , width : nowSize + "px", zIndex : "100", position : "absolute", display : "none", cursor : "none", pointerEvents : "none",transform : "rotate(" + nowRot + "deg)" }}>
          </img>
          <div>
            回転
            <input  type = "number"  id = "rotInput"  onInput = {rotChange}   min = {GetRotMin(nowName)}  max = {GetRotMax(nowName)} defaultValue = "0"></input>
            サイズ
            <input  type = "number"  id = "sizeInput"  onInput = {sizeChange}  min = {GetSizeMin(nowName)}  max = {GetSizeMax(nowName)}  defaultValue = "30"></input>
          </div>
          <div  id = "name-buttons" className="">
          {Object.entries(GetPartsAll()).map((value) => (
            // 「顔」とか「髪」とかのボタンを描画。
            <button  key = {value[0]} id={value[0]+"IconNameButton"}  className = {value[0]+" "+"iconNameButton btn-border_buttom"}  data-name = {value[0]}  
              onClick = {(e)=>{
                // 「顔」とかのボタンの今までアクティブついてたの消して、今押されたやつにactiveを追加。その他サイズや回転なども変更
                document.getElementsByClassName('iconNameButton').forEach(activeElement => {
                  if(activeElement.classList.contains('active')){
                    activeElement.classList.remove('active');
                  }
                });
                setNowName(e.target.dataset.name);
                setNowKind(GetImgsInfoEach(e.target.dataset.name,'kind'));
                document.getElementById('sizeInput').value=GetSizeXNow(e.target.dataset.name);
                document.getElementById('rotInput').value=GetRotNow(e.target.dataset.name);
                inputSizeSet(e.target.dataset.name);
                inputRotSet(e.target.dataset.name);
              }}
            >{value[1]["displayName"]}</button>
          ))}
          </div>
          <PartsSelect />
          </makeIconContext.Provider>
          }
      </div>
    )
}
const makeIconContext = createContext([])
export {makeIconContext};
export default MakeIcon;
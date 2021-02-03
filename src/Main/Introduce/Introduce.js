import { useEffect } from "react";
import randomMoveTimer from "../../IconRandomMove";
import Icon from "../../IconRender";
import { GetIconRandom } from "../../UserSettings/UserInfo/MakeIcon/IconData";
import './introduce.css'


const IconMove=()=>{
  let timers=[];
  for(let i=0;i<timers.length;i++){
    clearInterval(timers[i]);
  }
  timers=[];
  const iconparts=  document.getElementsByClassName('intro-iconparts');
  for(let i=0;i<iconparts.length;i++){
    timers.push(randomMoveTimer(iconparts[i],1000));
  }
  return timers;
}


const Introduce = () => {
  useEffect(()=>{
    let moveTimer=IconMove();
    return ()=>{
      moveTimer.forEach(timer => {
        clearInterval(timer);
      });
    }
  });

  return (
    <div className="bs-component">
			<div id="intoro-box">
        <Icon iconInfo={GetIconRandom()} where="intro" iconSize="200" />
        <div id="intro-texts">    
				  <h2>「エモいチャット。」へようこそ！</h2>
				  <p id="text">エモいチャットとはエモートや、リアクション機能を搭載し、より「話してる感」を味わえるありそうでなかったチャットです！</p>
        </div>
      </div>
		</div>
  )
}

export default Introduce;
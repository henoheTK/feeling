import React,{useContext} from 'react';
import {userContext} from '../../../App';
import {stageContext} from '../Stage';
import Icon from '../../../IconRender'
import ReActions from './IconAccessory/ReActions'
import NewComment from './IconAccessory/NewComment';
import ReActionButtons from './IconAccessory/ReActionButtons';
import firebase, {db} from '../../../Firebase/Firebase'
import './IconAccessory/iconacce.css';

const StageIcon = (props) => {
  const {userId} = useContext(userContext);
  const {emotions,reActions,newComment}=useContext(stageContext);

  return(
    <div className="stageIcon">
      {console.log(props.renderInfo)}
      {props.renderInfo[0] !== userId && // ディスプレイネームを表示
        <h3 className="stageIcon-displayName icon-acce">{props.renderInfo[1]['displayName']}</h3>
      }
      {props.renderInfo[0] === userId && // 自分ならselfMaskクラスを追加したやつを描画
        <h3 className="self-mark stageIcon-displayName icon-acce">{props.renderInfo[1]['displayName']}</h3>
      }
      {newComment===null&&
        <p className="icon-acce">Loading NewComment...</p>
      }
      {newComment!==null&&
        newComment[props.renderInfo[0]]&& // 新しいコメントがあるなら、新しいコメントを描画
          <NewComment renderId={props.renderInfo[0]}/>
      }
      <Icon iconInfo={props.renderInfo[1]['iconInfo']} iconSize={200} emotion={emotions[props.renderInfo[0]]} where="stage"/> 
      {props.renderInfo[0] !==userId && // 自分でないならアクションのボタンを描画
        <ReActionButtons renderId={props.renderInfo[0]}/>
      }
      {reActions===null&&
        <p className="icon-acce">Loading Actions...</p>
      }
      {reActions!==null&&
        reActions[props.renderInfo[0]]&&
          <ReActions renderId={props.renderInfo[0]}/>
      }
    </div>
  );
}

export default StageIcon;
import React,{ useContext,useEffect,useState } from 'react';
import {Link} from 'react-router-dom';
import { userContext } from '../App';
import firebase, {db} from '../Firebase/Firebase'
import Icon from '../IconRender';
import './navbar.css'

function NavBar() {
  const {isOnline,userId,userInfo} = useContext(userContext);
  const [allrooms,setAllRooms] =useState(null);
  const [nowRoom,setNowRoom] =useState(null);
  
  useEffect(()=>{
    
    if(userInfo){
      // 一番最後に入ったルームのルーム名取得。
      if(userInfo['room']){
        db.collection('rooms').doc(userInfo['room']).get().then((doc)=>{
          if(doc.exists){
            setNowRoom([doc.id,doc.data()['roomName']]);
          }else{
            // そのルームが存在しないならnullに。削除されたとき対策
            db.collection('users').doc(userId).update({
              room : null
            })
          }
        })
      }
      // 入室しているルームを取得
      if(userInfo['rooms'].length!==0){
        db.collection('rooms').where(firebase.firestore.FieldPath.documentId(),'in',userInfo['rooms']).get().then((doc)=>{
        let roomInfos={};
        let existsRoom=[];
        if(!doc.empty){
          doc.docs.forEach((room)=>{
            if(room.exists){
              roomInfos[room.id]=room.data()['roomName'];
              existsRoom.push(room.id);
            }
          });
          setAllRooms(roomInfos);
          if(existsRoom.length!==userInfo['rooms'].length){
            db.collection('users').doc(userId).update({
              rooms:existsRoom
            })
          }
        }else{
          setAllRooms(false);
          db.collection('users').doc(userId).update({
            rooms:[]
          })
        }
      }).catch((error)=>{
        console.log('Error:'+error)
      })
    }else{
      setAllRooms(false);
    }
  }
  },[userInfo]);
  return (
    <nav className="navbar navbar-default" style={{'margin':'0px'}}>
      <div className="container-fluid">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="/">エモいチャット。</a>
				</div>

				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav">
            
            <li className=""><a href="/">ホーム<span className="sr-only">(current)</span></a></li>

            {nowRoom!==null&&
              <li className=""><a href={"/room/"+nowRoom[0]}>{nowRoom[1]}<span className="sr-only">(current)</span></a></li>
            }
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">ルームs <span className="caret"></span></a>
              <ul className="dropdown-menu" role="menu">
                  {allrooms===false &&
                    <li><p>no rooms</p></li>
                  }
                  {allrooms===false &&
                    <li><p>not loggedIn</p></li>
                  }
                  {allrooms!==null && allrooms!==false &&
                    Object.entries(allrooms).map((value)=>(
                     <li key={value[0]}><a href={"/room/"+value[0]}>{value[1]}</a></li>
                    ))
                  }
						  	</ul>
						  </li>
          </ul>
					{/*検索機能はいったんコメントアウト
          <form className="navbar-form navbar-left" role="search">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Search" />
						</div>
						<button type="submit" className="btn btn-default">Submit</button>
          </form>
          */}
          {isOnline===true &&
					  <ul className="nav navbar-nav navbar-right">
					  	<li id="userInfo-li"  href="/userSetting">
                <a id='infoLink-icon' href="/userSetting"></a>
                <div href="/userSetting"  className='iconMask barMask'>
                  {userInfo !== null&&
                    <Icon iconInfo={userInfo['iconinfo']} where="header" iconSize="50" />
                  }
                  <h6 id="icon-loading-text">loading icon...</h6>
                </div>
              </li>
					  </ul>
          }
				</div>
			</div>
		</nav>
  );
}
//<Icon iconInfo={}></Icon>
            
export default NavBar;

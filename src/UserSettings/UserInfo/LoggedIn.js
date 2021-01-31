import firebase,{db} from '../../Firebase/Firebase';
import {userContext} from '../../App';
import {useContext,useEffect,useState} from 'react';
import { SettingContext } from '../UserSettings';
import { Redirect } from 'react';
import { GetImgsInfoAllAll } from './MakeIcon/IconData';
//import logoutFromGoogle from '../Logout';
import './loggedIn.css'

const Loggedin=()=>{
  const {setIsOnline , isOnline , setUserId , userId ,userInfo} = useContext(userContext);
  
  const logoutFromGoogle = () => { 
    firebase.auth().signOut();
    setIsOnline(false);
    setUserId(null);
  }

  const changeInfoAPI = () =>{
    if(document.getElementById('save-button').classList.contains('active')){
      const newDisplayName = document.getElementById('displayName-input').value;
      const newOneWordName = document.getElementById('oneWord-input').value;
      db.collection('users').doc(userId).update({
        displayName : newDisplayName,
        oneWord     : newOneWordName,
      }).then((doc)=>{
        let value=GetImgsInfoAllAll();
        db.collection('users').doc(userId).update({
          iconinfo:value
        }).then(()=>{
          document.location.reload();
        }).catch(error => {
          // error
          console.log(error)
        });
      }).catch((error)=>{
        logoutFromGoogle();
        alert('エラーが発生しました。申し訳ありませんが、もう一度ログインをお願いします。Error:'+error);
        console.log(error);
      })
    }
  }

  return(
    <div>
      {userInfo===null&&
        <p>Loading userInfo...</p>
      }
      {userInfo&&
        <div>
          <ul>
            <li><h4>表示名</h4><input id="displayName-input" type="text" maxLength="15" defaultValue={userInfo['displayName']} 
            onChange={()=>{
              document.getElementById('save-button').classList.add('active')
            }}></input></li>
            <li><h4>ひとこと</h4><h3><input id="oneWord-input" type="text" maxLength="30" defaultValue={userInfo['oneWord']}
            onChange={()=>{
              document.getElementById('save-button').classList.add('active')
            }}></input></h3></li>
            <li><h4>名前</h4><h3>{userInfo['userName']}</h3></li>
            <li><h4>メールアドレス</h4><h3>{userInfo['email']}</h3></li>
            <li><h4>Googleでログインしています</h4><button onClick = {logoutFromGoogle}>ログアウト</button></li>
          </ul>    
          <a id="save-button" onClick = {changeInfoAPI} >変更を保存</a>
        </div>
      }
    </div>
  )
}


export default Loggedin;
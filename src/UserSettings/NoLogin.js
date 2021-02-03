import firebase,{db} from '../Firebase/Firebase';
import {Redirect} from 'react-router-dom';
import {useContext} from 'react';
import { setIsFirst, userContext } from '../App';
import { GetIconRandom } from './UserInfo/MakeIcon/IconData';

const NoLogin=()=>{
  const {setUserId,setUserName,setIsOnline,isOnline} = useContext(userContext);

  const logoutFromGoogle = () => { 
    firebase.auth().signOut();
    setIsOnline(false);
    setUserId(null);
  }


  // ログイン処理
  const loginWithGoogle = () => {
    // もうauthにアカウントがあるかとかかな？...
    setIsFirst(true);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {

      const provider = new firebase.auth.GoogleAuthProvider();

      // サインインしてもらう
      firebase.auth().signInWithPopup(provider)
      .then(async function(result) {
        await db.collection('/users').where('userId','==',result.user.uid).get().then(function(doc) {
          console.log(doc);
          // まだアカウントないなら
          if (doc.empty) {
            console.log("No user");
            db.collection('users').doc(result.user.uid).set({
              userId      : result.user.uid,
              displayName : 'ゲスト',
              oneWord     : '',
              room        : null,
              rooms       : [],
              iconinfo    :(GetIconRandom())
            }).then(async (doc)=>{
              await db.collection('users').doc(result.user.uid).collection('seclet').doc(result.user.uid).set({
                userName : result.user.displayName,
                email    : result.user.email,
              }).then(()=>{
                console.log('login fin');    
                setIsOnline(true);
                setUserId(result.user.uid);
              }).catch((error)=>{
                db.collection('users').doc(result.user.uid).delete().then(()=>{
                  logoutFromGoogle();
                  alert('エラーが発生しました、もう一度ログインをお願いします。Error:'+error);
                  console.log(error);
                })
              })
            }).catch((error)=>{
              logoutFromGoogle();
              alert('エラーが発生しました、もう一度ログインをお願いします。Error:'+error);
              console.log(error);
            })
          }else{
            setIsOnline(true);
            setUserId(result.user.uid);
          }
        })
        .catch(function(error) {
          console.log("Error : ", error);
        });
      }.bind(this))
        .catch(function(error) {
          alert("Googleでサインインできませんでした。 Error: " , error);
          console.log(error);
          return false;
        }
      );
    }.bind(this));
  }
  
  return(
    <div>
      {isOnline === true &&
        <div>
          ログインしました！
          <Redirect to = "/userSetting"/>
        </div>
      }
      {isOnline === false &&
        <div>
          ログインしていません
          <button onClick = {loginWithGoogle}>
            Googleでログイン
          </button>
        </div>
      }
      {isOnline === null &&
        <>loading aouth...</>
      }
    </div>
    
  )
}

export default NoLogin;
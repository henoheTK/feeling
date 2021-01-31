import React, { Component,getState, createContext,useContext,useState,useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Comments from './Room/Comments/Comments';
import MakeIcon from './UserSettings/UserInfo/MakeIcon/MakeIcon';
import UserSettings from './UserSettings/UserSettings';
import Room from './Room/Room';
import Main from './Main/Main';
import { useWorker } from 'react-hooks-worker';

import {googleauthConfig} from 'miserarenaiyo';
import firebase, { db } from './Firebase/Firebase';  
import NoLogin from './UserSettings/NoLogin';
import Error from './Error/Error';

//ユーザー系のcontext
export const userContext=createContext();

let isFirst=false;

const App = () => {
  //ユーザー系のステート
  const [isOnline , setIsOnline] = useState(null);
  const [userId   , setUserId  ] = useState(null);
  const [userInfo , setUserInfo] = useState(null);
  
  useEffect(() => {
    async function getUserInfo(){
      if(userId){
        const userInfoUnsubscribe = await db.collection('users').doc(userId).onSnapshot(doc=>{
          db.collection('users').doc(userId).collection('seclet').doc(userId).get().then(seclet=>{
            let data=doc.data();
            let secletdata=seclet.data();
            setUserInfo({
              userName    : secletdata['userName'] ,
              email       : secletdata['email']    ,
              displayName : data['displayName']    ,
              oneWord     : data['oneWord']        ,
              iconinfo    : data['iconinfo']       ,
              rooms       : data['rooms']          ,
              room        : data['room']
            });
          });
        });
        return () => userInfoUnsubscribe();
      }
    }
    getUserInfo();
  },[userId]);

  useEffect(() => {
    //ログイン時にステート更新する処理
    firebase.auth().onAuthStateChanged(async function (user) {
      let isOnline = false;
      let userId = null;
      if (user) {
        userId   = user.uid;
        isOnline = true;
      }
      // 初回ログイン時、データの追加より先に、stateが更新され、エラーになってしまうため、その対策。
      if(!isFirst){
        setUserId(userId);
        setIsOnline(isOnline);
      };
      //this.setState({isOnline:isOnline})
      //this.setState({userId:userId})
    }.bind(this));
  })
  // ルーティングはここでやる
  return (
      <div>
      <userContext.Provider value={{isOnline , setIsOnline , userId , setUserId, userInfo , setUserInfo }}>
        <NavBar/>
        <Switch>
          <Route exact path = '/login' component = {NoLogin} /> 
          {isOnline === false &&<Redirect to = {'/login'} />}
          {isOnline === true &&
            <Switch>
              <Route exact path='/error'       component = {Error}/>
              <Route exact path='/'            component = {Main}/>
              <Route exact path='/userSetting' component = {UserSettings}/>
              <Route exact path='/room/:id'    component = {Room}/>
              <Redirect to = {'/error'} />
            </Switch>
          }
          <>loading...</>
        </Switch>
      </userContext.Provider>
      </div>
  );
}





/**
 * 
 * <Auth>
            <Switch>
            </Switch>
          </Auth>
          
 *  */
//export {UserContext};
export function setIsFirst(newValue){
  isFirst=newValue;
}
export default App;

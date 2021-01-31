import React, {Component,useContext,createContext,useState,useEffect} from 'react';
import { BrowserRouter as Router, Redirect, Route, RouteProps, Switch } from 'react-router-dom';

import axios from 'axios';
import MakeIcon from './UserInfo/MakeIcon/MakeIcon';
import {userContext} from '../App'

import firebase, { db } from '../Firebase/Firebase';  
import NoLogin from './NoLogin';
import Loggedin from './UserInfo/LoggedIn';

import './usersettings.css';
//import logoutFromGoogle from './Logout';


const UserSettings = () =>{
  const {isOnline,setIsOnline,userId,setUserId,userInfo,setUserInfo} = useContext(userContext);
  
  const logoutFromGoogle = () => { 
    firebase.auth().signOut();
    setIsOnline(false);
    setUserId(null);
  }

  return (
      <div>
        {isOnline===null &&
          <p>loading....</p>
        }
        {isOnline === true &&
          <div id="settings">
            <MakeIcon />
            <Loggedin />
          </div>
        }
        {isOnline === false &&
          <NoLogin/>
        }
      </div>
  );
}
export default UserSettings;

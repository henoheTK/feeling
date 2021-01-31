import React,{createContext,useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.css'
//import User from './User';
//import { createStore } from 'redux'
//import todoApp from './reducers/test.js'
//let store = createStore(todoApp)

//import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBlCsDiug4-MgeRLT-xotmPAATxBcKyKe4",
    authDomain: "reactfirebase-f24a1.firebaseapp.com",
    databaseURL: "https://reactfirebase-f24a1.firebaseio.com",
    projectId: "reactfirebase-f24a1",
    storageBucket: "",
    messagingSenderId: "427259174161",
    appId: "1:427259174161:web:ebf8269d920efbcc"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

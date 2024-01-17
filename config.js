import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAQfYVx7oTiECla7KEwwYfaYUTx1L4X9N8",
  authDomain: "react-expense-dc56d.firebaseapp.com",
  databaseURL: "https://react-expense-dc56d-default-rtdb.firebaseio.com",
  projectId: "react-expense-dc56d",
  storageBucket: "react-expense-dc56d.appspot.com",
  messagingSenderId: "436011522617",
  appId: "1:436011522617:web:933f9ebff8c75546e68be8",
};

// const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app);

let auth;
if(!firebase.apps.length){
  const app = firebase.initializeApp(firebaseConfig);
  auth = getAuth(app);
}
export  {auth};
// 
//IOS: 848932974470-20pmaii6umgdcrhpiktm9iima8dlsn27.apps.googleusercontent.com

//Android : 848932974470-4al6k0njh94pjp7arhhskds76oq4m9aj.apps.googleusercontent.com
import { initializeApp } from 'firebase/app';

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBH5WsJY3fW3UJEx6JBHmC_IwEH7ir259g",
    authDomain: "eurovision-ccc4f.firebaseapp.com",
    projectId: "eurovision-ccc4f",
    storageBucket: "eurovision-ccc4f.appspot.com",
    messagingSenderId: "930778339963",
    appId: "1:930778339963:web:212147d5f7f138299920de"
};


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
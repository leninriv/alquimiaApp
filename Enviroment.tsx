
import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyBg6JK-Nqph9mQvs4ek8z5mshez2Dy1fp4",
    authDomain: "hotelalquimia-3fca0.firebaseapp.com",
    databaseURL: "https://hotelalquimia-3fca0.firebaseio.com",
    projectId: "hotelalquimia-3fca0",
    storageBucket: "hotelalquimia-3fca0.appspot.com",
    messagingSenderId: "919225605809",
    appId: "1:919225605809:web:881938ae9e51808de48c90"
}

export function firebaseInitApp() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase
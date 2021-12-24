import firebase from "firebase";
import "firebase/app";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyBwrBhHtmpgK6ews_X9XNr5iY7XwSydWlY",
    authDomain: "unique-linker-336016.firebaseapp.com",
    projectId: "unique-linker-336016",
    storageBucket: "unique-linker-336016.appspot.com",
    messagingSenderId: "956143417319",
    appId: "1:956143417319:web:49ba4648a35b8f0c046f42",
    measurementId: "G-QZ6KYQ2YY0"
}
let fire = null
if (!firebase.apps.length) {
    fire = firebase.initializeApp(config)
} else {
    fire = firebase.app(); // if already initialized, use that one
}

const storage = fire.storage()

export default firebase;
export {
    storage
}




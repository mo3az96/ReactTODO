
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCF3fyTJkdvIG9ne8V7KCCNIF9M9XjYLXg",
    authDomain: "todo-2612d.firebaseapp.com",
    databaseURL: "https://todo-2612d.firebaseio.com",
    projectId: "todo-2612d",
    storageBucket: "todo-2612d.appspot.com",
    messagingSenderId: "386250605586",
    appId: "1:386250605586:web:643807c61b0c73fa2d04cb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

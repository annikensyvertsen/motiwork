
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let fire;

if(!firebase.apps.length){
  fire = firebase.initializeApp({
    apiKey: "AIzaSyBNmqd7Rpu7qqfLFL_3o3AoZyciggmYJ2I",
    authDomain: "motiwork-6a790.firebaseapp.com",
    projectId: "motiwork-6a790",
    storageBucket: "motiwork-6a790.appspot.com",
    messagingSenderId: "19307239945",
    appId: "1:19307239945:web:3de712759add5345fcf6d8",
    measurementId: "G-7H0BDWJPCN"
  });
}else {
  fire = firebase.app();
}

/* const fire = firebase.initializeApp({
  apiKey: "AIzaSyBNmqd7Rpu7qqfLFL_3o3AoZyciggmYJ2I",
  authDomain: "motiwork-6a790.firebaseapp.com",
  projectId: "motiwork-6a790",
  storageBucket: "motiwork-6a790.appspot.com",
  messagingSenderId: "19307239945",
  appId: "1:19307239945:web:3de712759add5345fcf6d8",
  measurementId: "G-7H0BDWJPCN"
}); */

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};
// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = fire.auth();
export const db = fire.firestore();
export default {
  fire,
};*/ 
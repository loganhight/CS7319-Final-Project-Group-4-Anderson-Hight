// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD5b8dlaFwdZuOzMt9my2m0Bbj4VkoHMA",
  authDomain: "pfma-project.firebaseapp.com",
  projectId: "pfma-project",
  storageBucket: "pfma-project.firebasestorage.app",
  messagingSenderId: "6015816206",
  appId: "1:6015816206:web:062a9eec196df2975a625f",
  measurementId: "G-4JBD8P2NPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };

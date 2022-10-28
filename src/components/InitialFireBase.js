import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCg-S8gnYX-qAxdBlFcD-tamuCSj7EbJbw",
  authDomain: "react-6ff69.firebaseapp.com",
  databaseURL: "https://react-6ff69-default-rtdb.firebaseio.com",
  projectId: "react-6ff69",
  storageBucket: "react-6ff69.appspot.com",
  messagingSenderId: "646102192888",
  appId: "1:646102192888:web:54350bb71e3a6e8b50210d",
  measurementId: "G-DX515NBH1M"
};

initializeApp(firebaseConfig);

export default initializeApp;

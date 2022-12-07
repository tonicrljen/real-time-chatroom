import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
  where,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLeGurv9V5x7iGb4ai07wsJ9sT7uEc-uQ",
  authDomain: "udemy-modern-javascript-d05a6.firebaseapp.com",
  projectId: "udemy-modern-javascript-d05a6",
  storageBucket: "udemy-modern-javascript-d05a6.appspot.com",
  messagingSenderId: "539095324744",
  appId: "1:539095324744:web:b377650bedf5cb95e8207d",
  measurementId: "G-G1ZNZFE6HV",
};

// init firebase app

initializeApp(firebaseConfig);

// inite services

const db = getFirestore();

// adding new chat documents
// setting up real-time listener to get new chats
// updating the username
// updating the room
class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = collection(db, "chats");
    this.unsub;
  }
  async addChat(message) {
    // format a chat object
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: serverTimestamp(),
    };
    // save the chat document
    await addDoc(this.chats, chat);
  }
  getChats(callback) {
    const q = query(
      this.chats,
      where("room", "==", this.room),
      orderBy("created_at")
    );
    this.unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          // update the ui
          callback(change.doc.data());
          console.log(change);
        }
      });
    });
  }
  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }
  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

const chatroom = new Chatroom("gaming", "mate");
// chatroom
//   .addChat("hello everyone")
//   .then(() => {
//     console.log("chat added");
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// chatroom.getChats((data) => {
//   console.log(data);
// });

// setTimeout(() => {
//   chatroom.updateRoom("music");
//   chatroom.updateName("stipe");
//   chatroom.getChats((data) => {
//     console.log(data);
//   });
//   chatroom.addChat("hello");
// }, 3000);

export { initializeApp, db, firebaseConfig, Chatroom };

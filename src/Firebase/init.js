// src/Firebase/init.js

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCbQQyPy0eNgG9KhW3TtRyQaRrWf8Sony4",
  authDomain: "week7-taoyang.firebaseapp.com",
  projectId: "week7-taoyang",
  storageBucket: "week7-taoyang.appspot.com", 
  messagingSenderId: "587622336276",
  appId: "1:587622336276:web:fafd3f1555e85a68bfe401"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }

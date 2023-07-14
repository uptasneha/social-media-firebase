import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAgcuii-GkxDsmG7p9HyUh9KZByjst4F7Q",
  authDomain: "socialmedia-d770e.firebaseapp.com",
  projectId: "socialmedia-d770e",
  storageBucket: "socialmedia-d770e.appspot.com",
  messagingSenderId: "579141932847",
  appId: "1:579141932847:web:c109ded5f1f2d3db7af3da"
};

export const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

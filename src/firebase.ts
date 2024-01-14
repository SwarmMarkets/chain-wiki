import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyBwPJkkr-AsWZAy5ZGb94LrFf8v7yKNybE',
  authDomain: 'chain-wiki.firebaseapp.com',
  projectId: 'chain-wiki',
  storageBucket: 'chain-wiki.appspot.com',
  messagingSenderId: '355001496730',
  appId: '1:355001496730:web:7b499db290ae0178f99b23',
  measurementId: 'G-66JCDSMPGL',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, 'gs://chain-wiki.appspot.com');
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAJ_jesQu_QFBlmtoBrSdGgvEDbO6UwWEk',
  authDomain: 'ozlearning.firebaseapp.com',
  projectId: 'ozlearning',
  storageBucket: 'ozlearning.appspot.com',
  messagingSenderId: '1081690833390',
  appId: '1:1081690833390:web:394191d814ebaa13388eff',
  measurementId: 'G-V0KHSFMHDN'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

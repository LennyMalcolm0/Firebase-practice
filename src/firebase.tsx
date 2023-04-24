import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlr6k_Qsvg7nNFGAF-vGzDJtVWRwSEIN8",
  authDomain: "fir-practice-a3185.firebaseapp.com",
  projectId: "fir-practice-a3185",
  storageBucket: "fir-practice-a3185.appspot.com",
  messagingSenderId: "454027332683",
  appId: "1:454027332683:web:9a2b907e8a6ae9f11551ce",
  measurementId: "G-E0VTQLK9JC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase
const analytics = getAnalytics(app);
export const database = getFirestore();
export const auth = getAuth();

export const playersCollection = collection(database, 'Players');
export const usersCollection = collection(database, 'users');

// export const user: any | null = auth.currentUser;
// export const userDocument = doc(database, "users", user.uid);
// export const userDocumentCollection = collection(userDocument, "user-team");